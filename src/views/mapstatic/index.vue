<template>
    <div class="all">
        <div class="header">静态地图展示</div>
        <div class="body">
            <div id="mapchart" ref="mapchart" style="height:100%" class="mapChart"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import chinaData from "./map/china.json";

export default {
    data () {
        return {
            myChart: null,
            centerObj: {
                center: [28.71484375, 39.39516718887485],
                // center: null,
                layoutCenter: ['50%','50%'],
                layoutSize: 180
            },
            center:null,
        }
    },
    mounted() {
        this.getChinaJson()
    },
    methods:{
        getChinaJson(){
            import('./map/china.json').then(geoJson => {
                console.log('geoJson',geoJson)
                this.renderChinaChart(geoJson.default)
            })
        },
        renderChinaChart(chinaMap){
            console.log('chinamap',chinaMap)
            this.myChart = echarts.init(document.getElementById('mapchart'))
            echarts.registerMap('china', chinaMap);
            let optionmap = this.formatOption('china')
            this.myChart.setOption(optionmap,true)
            // this.myChart.on('click',function(params){
            //     let center = [28.71484375, 39.39516718887485]
            //     let event = params.event
            //     // let center = [event.offsetX,event.offsetY]
            //     let offsetX = params.event.offsetX;
            //     let offsetY = params.event.offsetY;
            //     // console.log(this.myChart.getOption().series)
            //     // let zuobiao = this.myChart.convertFromPixel('series', [offsetX, offsetY]); // 转换成坐标

            //     // let zuobiao = this.myChart.convertFromPixel('geo', center); // 转换成坐标
            //     this.center = center
            //     // console.log('params',zuobiao)
            // })
        },
        formatOption(opt){
            // let that = this
            let option = {
                title:{
                    text:'中国地图'
                },
                // geo:{
                //     type:'map',
                //     map:opt,
                //     // roam:true,
                //     aspectScale: 0.75, //长宽比
                //     //zoom: 1.1, //当前视角的缩放比例
                //     roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                //     zoom: 0.9,
                //     showLegendSymbol: false,
                //     layoutCenter: ["50%", "48%"],
                //     layoutSize: "112%",
                //     label: {
                //         emphasis: {
                //             show: false
                //         }
                //     },
                //     roam: true,
                //     itemStyle: {
                //         normal: {
                //             areaColor: '#323c48',
                //             borderColor: '#111'
                //         },
                //         emphasis: {
                //             areaColor: '#2a333d'
                //         }
                //     },
                //     itemStyle: {
                //         normal: {
                //         areaColor: "rgba(18,35,92,0.1)",
                //         borderWidth: 1,
                //         borderColor: "#0a53e9", //线
                //         shadowColor: "#092f8f", //外发光
                //         shadowBlur: 20,
                //         },
                //         emphasis: {
                //         areaColor: "#0a2dae", //悬浮区背景
                //         textStyle: {
                //             color: "#FFFFFF",
                //         },
                //         },
                //     },
                // },
                series: [
					{
						type: 'map',
						// mapType: opt,
						map: opt,

                        center:this.center,
                        // layoutCenter:['50%', '50%'],
                        // layoutSize:180,

						showLegendSymbol: false, // 在图例相应区域显示图例的颜色标识（系列标识的小圆点），存在 legend 组件时生效。
                        // aspectScale:scale,
                        label: {
                                    // show:true,
                            distance:5, //距离图形元素的距离
                            fontFamily:'PingFangSC-Medium', //文字字体系列
                            fontSize:14,
                            fontWeight:300,
                            normal: {
                                show: true, //是否显示标签
                                    textStyle: {
                                        color: 'rgba(255,255,255,0.65)'
                                    },
                            },
                            // emphasis: { //高亮状态下的多边形和标签样式
                            //     textStyle: {
                            //         color: '#fff'
                            //     },
                            //     areaColor:'#D04F27' //地图区域的颜色
                            // }
                        },
                        itemStyle:{ //静态默认展示时样式
                            areaColor:'rgba(1,29,66,1)', //地图区域颜色
                            borderColor:'rgb(75,170,250)', //图形的描边颜色
                        },
                        emphasis:{ //鼠标hover时展示样式
                            label:{
                                show:false, //是否显示标签
                                fontFamily:'PingFangSC-Medium',
                            },
                            itemStyle:{
                                areaColor:'rgb(26, 154, 248)',
                                color: '#fff'
                            },

                        },
                        select:{ //点击时高亮样式
                            label:{ 
                                show: true, //是否显示标签
                                color: '#fff'
                            },
                            itemStyle:{
                                areaColor:'rgb(26, 154, 248)', //地图区域颜色
                                color: '#fff' //图形颜色
                            }, 

                        },
                        layoutSize: 700, //地图大小
                        roam: true, //是否开启鼠标缩放和平移漫游
                        animation: false, //是否开启动画
                        zoom:1.2, //当前视角的缩放比例
                        data: [],
                        markPoint: { //图表标注
                            symbol: "image://" + this.markPointIcon, //标记的图形
                            symbolSize: [60, 60], //标记大小
                            silent: true, //图形是否不响应和茶法鼠标事件
                            label: {
                                show: false
                            },
                            data: []
                        }
				    }
				]
            }
            return option
        }
    }
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
			// height: calc(100% - 50px);
            // line-height: 100%;
            text-align: center;
            padding:20px;
            height: 800px;
            width: 100%;
        }
    }
</style>
