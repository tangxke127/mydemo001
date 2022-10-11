<template>
    <div class="all">
        <div class="header">开源地图展示</div>
        <div class="body">
            <div class="BaiDuMap">
                <baidu-map
                :center="center"
                :zoom="zoom"
                :scroll-wheel-zoom="true"
                style="width: 100%; height: 100%"
                @ready="handler"
                @click="clickmap"
                @zoomend="zoomend"
                >   
                <!-- 左上 -->
                    <bm-city-list 
                        anchor="BMAP_ANCHOR_TOP_LEFT" 
                        style="width:200px;background:pink">
                    </bm-city-list>
                    <!-- 按钮 -->
                    <bm-control style="margin: -10px 90px" >
                        <Button @click="openDistanceTool">开启测距</Button>
                        <Button style="position:relative;margin:20px" @click="opencircle">设置圆形范围</Button>
                        <Button style="position:relative;margin:20px" @click="openweather">天气查询</Button>
                        <Drawer 
                            title="设置圆形范围" 
                            :closable="false" 
                            v-model="circledraw">
                            <Form :model="formData">
                                <!-- <FormItem label="经度" label-position="top">
                                    <Input v-model="formData.jingdu" placeholder="please enter user name" />
                                </FormItem>
                                <FormItem label="纬度" label-position="top">
                                    <Input v-model="formData.weidu" placeholder="please enter url">
                                    </Input>
                                </FormItem> -->
                                <FormItem label="半径" label-position="top">
                                    <Input v-model="formData.banjing" placeholder="输入搜索半径(单位m)" />
                                </FormItem>
                            </Form>
                            <div class="demo-drawer-footer">
                                <Button style="margin-right: 8px" @click="closecircle">关闭功能</Button>
                                <Button style="margin-right: 8px" @click="circledraw = false">取消</Button>
                                <Button type="primary" @click="submitcircle">确定</Button>
                            </div>
                        </Drawer>
                    </bm-control>
                    
                    <bm-control style="margin: 50px 10px" >
                        <Dropdown  style="margin-bottom:10px" @on-click="searchMenu">
                            <Button type="primary">
                                搜索类型
                                <Icon type="ios-arrow-down"></Icon>
                            </Button>
                            <template #list>
                                <DropdownMenu>
                                    <DropdownItem name="keyword">关键词搜索</DropdownItem>
                                    <DropdownItem name="busroute">公共交通路线</DropdownItem>
                                </DropdownMenu>
                            </template>
                        </Dropdown>
                        <div v-if="searchname === 'keyword'">
                            <Input prefix="md-locate" v-model="location" placeholder="地区" style="width: 150px;margin-right:10px" />
                            <Input prefix="md-key" v-model="keyword" placeholder="关键词" style="width: 150px;margin-right:10px" />
                            <bm-local-search 
                                :keyword="keyword" 
                                :auto-viewport="true" 
                                :panel="keyword && location?true:false" 
                                :location="location"  
                                class="searchkeybox">
                            </bm-local-search>   
                        </div>
                        <div v-if="searchname === 'busroute'">
                            <Input prefix="md-locate" v-model="location" placeholder="地区" style="width: 150px;margin-right:10px" />
                            <Input prefix="md-key" v-model="startword" placeholder="起始点" style="width: 150px;margin-right:10px" />
                            <Input prefix="md-key" v-model="endword" placeholder="终止点" style="width: 150px;margin-right:10px" />
                            <bm-transit 
                                :start="startword" 
                                :end="endword" 
                                :panel="location && startword && endword?true:false" 
                                :auto-viewport="true" 
                                :location="location" 
                                class="searchbusbox" >
                            </bm-transit>       
                        </div>
                    </bm-control>
                <!-- 左下 -->
                    <!-- 左下显示比例尺测距 -->
                    <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale> 
                    <!-- <bm-panorama :offset="{width: 15, height: 60}" anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-panorama> -->
                <!-- 右上 -->
                    <!-- 地图类型 -->
                    <bm-map-type 
                        :offset="{width: 85, height: 20}"  
                        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" >
                    </bm-map-type>
                    <!-- 移动和放大 -->
                    <bm-navigation 
                        class="navigation" 
                        anchor="BMAP_ANCHOR_TOP_RIGHT" 
                        :showZoomInfo="true" 
                        @click="naviclick">
                    </bm-navigation>
                <!-- 右下 -->
                    <!-- 定位 -->
                    <bm-geolocation
                        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                        :showAddressBar="true"
                        :autoLocation="true"
                    ></bm-geolocation>
                <!-- 图层上 -->
                    <!-- 显示当前标记点 -->
                    <bm-marker 
                        :position="{lng: center.lng,lat: center.lat}" 
                        :dragging="true"  
                        @dragend="pointevent($event)">
                    </bm-marker>
                    <!-- 显示多标记点 -->
                    <bm-point-collection 
                        :points="points" 
                        shape="BMAP_POINT_SHAPE_CIRCLE" 
                        color="#9b95c9" 
                        size="BMAP_POINT_SIZE_NORMAL" 
                        @click="clickpoint">
                    </bm-point-collection>
                    <bm-point-collection 
                        :points="fupoints" 
                        shape="BMAP_POINT_SHAPE_CIRCLE" 
                        color="#bed742" 
                        size="BMAP_POINT_SIZE_NORMAL" >
                    </bm-point-collection>
                    <!-- <div v-for="(item,index) in points" :key="index" :value="item">
                        <bm-info-window :position="item" title="信息窗" show >
                            <p v-text="item.msg"></p>
                        </bm-info-window>
                    </div> -->
                    <!-- 地图中添加圆形 -->
                    <div v-if="opencirle === true">
                        <bm-circle 
                            :center="circlePath.center" 
                            :radius="circlePath.radius" 
                            stroke-color="#3CB371" 
                            :stroke-opacity="0.3" 
                            :stroke-weight="2" 
                            @lineupdate="updateCirclePath" 
                            :editing="true">
                        </bm-circle>
                    </div>
                   
                </baidu-map>
            </div>
        </div>
        <Modal
            v-model="pointmodal"
            title="我的经历"
            @on-ok="pointok">
            <Form :model="form">
                <FormItem>
                    <span>时间：</span>
                    <Select  multiple  v-model="form.time" style="width: 270px">
                        <Option value="2009">2009</Option>
                        <Option value="2010">2010</Option>
                        <Option value="2011">2011</Option>
                        <Option value="2012">2012</Option>
                        <Option value="2013">2013</Option>
                        <Option value="2014">2014</Option>
                        <Option value="2015">2015</Option>
                        <Option value="2016">2016</Option>
                        <Option value="2017">2017</Option>
                        <Option value="2018">2018</Option>
                        <Option value="2019">2019</Option>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                        <Option value="2022">2022</Option>
                    </Select>
                </FormItem>
                <FormItem>
                <span>地点：</span>
                    <Input
                        v-model="form.city"
                        style="width: 270px"
                    ></Input>
                </FormItem>
                <FormItem>
                <span>我的节点：</span>
                    <Input
                        v-model="form.thing"
                        style="width: 270px"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                    ></Input>
                </FormItem>
                <p>{{form.msg}}</p>
            </Form>
        </Modal>
    </div>
</template>

<script>
import baidujson from './data/custom_map_config.json'
import DistanceTool from 'bmaplib.distancetool'
import pointjson from './data/pointdata.js'
import cityjson from './data/city.json'
// src\views\mapopen\data\city.json

const restweburl = "http://api.map.baidu.com/";
import {jsonp} from "vue-jsonp"
export default {
    data () {
        return {
             // 地址信息
            address: null,
            center: { lng: 0, lat: 0 },
            //地图展示级别
            // zoom: 11,
            zoom: 5,
            circlePath: {
                center: {
                    lng: 116.404,
                    lat: 39.915
                },
                radius: 15000
            },
            opencirle:false,
            circledraw:false, //抽屉
            formData:{
                jingdu:'',
                weidu:'',
                banjing:''
            },
            points:pointjson.points,
            fupoints:pointjson.fupoints,
            location: '',
            keyword: '',
            startword:'',
            endword:'',
            pointmodal:false,
            form:{
                city:'',
                time:[],
                thing:''
            },
            searchname:'',
            pointaddress:null,//当前点的具体中文位置
            cityjson:cityjson,
            pcitydata:null,
            // pointpic:require('./set/address.png'),
            // mapStyle:baidujson,
            // mapStyle:{
            //     styleJson:[{
            //         "featureType": "land",
            //         "elementType": "geometry",
            //         "stylers": {
            //             "color": "#fffff9ff"
            //         }
            //     }, {
            //         "featureType": "water",
            //         "elementType": "geometry",
            //         "stylers": {
            //             "color": "#69b0acff"
            //         }
            //     },
            // ]
            // }
            // src\views\mapopen\set\address.png
        }
    },
    unmount () {
        distanceTool && distanceTool.close()
    },
    mounted(){
        // console.log('aaa',this.aaa)
    },
    methods: {
        // 初始化展示
        handler({ BMap, map }) {
            this.center.lng = 116.404;
            this.center.lat = 39.915;
            this.zoom = this.zoom;
            this.distanceTool = new DistanceTool(map, {lineStroke : 2})
            
        },
        naviclick(event){
            console.log(event)
        },
        clickmap(event){
            // console.log('click',event)
            this.center.lng = event.point.lng
            this.center.lat = event.point.lat
            this.zoom = event.target.getZoom()
            const point = {lng:event.point.lng,lat:event.point.lat} //点击获得当前坐标
            console.log('this.point',point)
            this.handlelocation(event.point.lng,event.point.lat)
        },
        // 坐标转换(通过坐标获取当前地区名称)
        handlelocation(lng,lat){
            // 创建地理编码实例
            const myGeo = new BMap.Geocoder();
            // 根据坐标逆解析地址
            myGeo.getLocation(new BMap.Point(lng, lat), (result) => {
                console.log(result, "result-->>>>");
                let add = result.addressComponents
                if (result) {
                    this.pointaddress = {
                        province:add.province,
                        city:add.city,
                        district:add.district
                    } 
                    // result.address;
                    console.log(this.pointaddress)
                    let name = this.pointaddress
                    this.cityjson.forEach(val =>{
                        if(val.province == name.province){
                            if(val.city == name.city){
                                // console.log('id是',val)
                                // console.log('id是22',name.district)
                                // let datatring = name.district.toString()
                                // console.log(val.district.indexOf(name.district) != -1)
                                if(name.district.includes(val.district)){
                                    console.log('idfdsafs',val)
                                    this.pcitydata = val
                                }
                            }
                        }
                    })
                }
                // 获取单个地理编码
                // // https://api.map.baidu.com/reverse_geocoding/v3/?ak=您的ak&output=json&coordtype=wgs84ll&location=31.225696563611,121.49884033194
                // let ak= 'gKPikHTaBGpGtbuBU0DNj5rxjAqUdTFH'
                // // https://api.map.baidu.com/weather/v1/?district_id=222405&data_type=all&ak=你的ak  //GET请求
                // const url = 
                // // `weather/v1/?district_id=${id}&data_type=all&ak=${ak}`
                // `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${ak}&output=json&coordtype=wgs84ll&location=31.225696563611,121.49884033194 `
                // // `weather/v1/?district_id=222405&data_type=all&ak=${ak}`
                //     // weather/v1/?district_id=222405&data_type=all&ak=你的ak
                //     // {
                //     // 	page:0,
                //     // 	pageSize:"100000"
                //     // }
                //     jsonp(url)
                //     .then((res) => {
                //         console.log('调取开源api成功',res)
                //     // if (response.status == 200 && response.data) {

                //     // 	// this.setList = response.data.items
                //     // }
                // })
            });
        },
        zoomend(event){
            console.log(event)
        },
        // 点拖拽(应该是拖拽的时候)
        pointevent(event){
            // console.log('event',event)
            if(this.opencirle === true){
                let center = {
                    lng:event.point.lng,
                    lat:event.point.lat
                }
                this.circlePath.center = center
            }
        },
        // 测距功能呢
        openDistanceTool (e) {
            const {distanceTool} = this
            distanceTool && distanceTool.open()
        },
        // 打开圆形范围功能
        opencircle(){
            this.circledraw = true
            // console.log('opencircle')
            this.opencirle = true
            this.circlePath.center = this.center
        },
        // 设置圆形范围
        submitcircle(){
            // console.log('this.formData',this.formData)
            this.circlePath.radius = this.formData.banjing
            this.circledraw = false
        },
        // 圆形范围展示
        updateCirclePath (e) {
            // console.log('kaishigoneng',e.target)
            this.circlePath.center = e.target.getCenter()
            this.circlePath.radius = e.target.getRadius()
            this.formData.banjing = e.target.getRadius()
        },
        // 关闭圆形功能
        closecircle(){
            this.opencirle = false
            this.circledraw = false
        },
        // 点击标记点
        clickpoint(e){
            // console.log('eee',e)
            this.points.forEach(val =>{
                if(val.lat === e.point.lat && val.lng === e.point.lng){
                    this.$Message.success(val.msg)
                    this.pointmodal = true
                    this.form = val
                }
            })
        },
        pointok(){
            this.pointmodal = false
        },
        // 选择查询菜单
        searchMenu(name){
            console.log('name',name)
            this.searchname = name
        },
        // 天气查询
        openweather(){
            this.$Message.info('正在开发中……')
            // console.log('当前点信息',this.pcitydata)
            // let data = this.pcitydata
            // let id = this.pcitydata.district_id
            // let ak= 'gKPikHTaBGpGtbuBU0DNj5rxjAqUdTFH'
            // const url = 
            // `https://api.map.baidu.com/weather/v1/?district_id=222405&data_type=all&ak=${ak} `
            //     jsonp(url)
			// 	.then((res) => {
            //         console.log('调取开源api成功',res)
			// })
        }
        // getClickInfo(e) {
        //     // 创建地理编码实例
        //     const myGeo = new BMap.Geocoder();
        //     // 根据坐标逆解析地址
        //     myGeo.getLocation(new BMap.Point(e.point.lng, e.point.lat), (result) => {
        //         console.log(result, "result-->>>>");
        //         if (result) {
        //         this.address = result.address;
        //         }
        //     });
        //     this.center.lng = e.point.lng;
        //     this.center.lat = e.point.lat;
        // },
        // syncCenterAndZoom(e) {
        //     console.log(e.target, 'e.target-->>>>')
        //     const { lng, lat } = e.target.getCenter();
        //     this.zoom = e.target.getZoom();
        // },
  },
}

</script>
<style lang="less" scoped>
    .all{
		margin:10px;
		.header{
			margin: 15px 0;
			padding: 15px 30px;
			background: #fff;
			font-family: PingFangSC-Medium;
			font-size: 20px;
			color: #17233d;
			letter-spacing: 0;
			font-weight: 500;
			border: 1px solid #e8eaec;
		}
		.body{
			background: white;
			border: 1px solid #e8eaec;
			height: calc(100% - 50px);
            line-height: 100%;
            text-align: center;
            padding:20px;
            .BaiDuMap {
                width: 100%;
                height: 700px;
                .navigation{
                    background: pink;
                }
                .searchkeybox{
                    margin:5px 0;
                    overflow: auto;
                    width:300px;
                    max-height:300px;
                    // margin-left:10px;
                    // border: 1px solid #929292;
                    border-radius:10px ;
                }
                .searchbusbox{
                    margin:5px 0;
                    overflow: auto;
                    width:500px;
                    max-height:400px;
                    // margin-left:10px;
                    // border: 1px solid #929292;
                    border-radius:10px ;
                }
            }
        }
    }
</style>
