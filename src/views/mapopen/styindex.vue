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
                    @click="getClickInfo"
                    @moving="syncCenterAndZoom"
                    @moveend="syncCenterAndZoom"
                    @zoomend="syncCenterAndZoom"
                >
                <!-- 必须给容器指高度，不然地图将显示在一个高度为0的容器中，看不到 -->
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation
                    anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                    :showAddressBar="true"
                    :autoLocation="true"
                ></bm-geolocation>
                <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                </baidu-map>
            </div>
        </div>
    </div>
</template>

<script>
import baidujson from './data/custom_map_config.json'
export default {
    data () {
        return {
             // 地址信息
            address: null,
            center: { lng: 0, lat: 0 },
            //地图展示级别
            zoom: 11,
        }
    },
    methods: {
        handler({ BMap, map }) {
            map.setMapStyle({     
                // styleId: '3d71dc5a4ce6222d3396801dee06622d'
                styleJson:baidujson
            });
            this.center.lng = 116.404;
            this.center.lat = 39.915;
            this.zoom = this.zoom;
           
        },
        // 点击定位当前地图地址居中显示
        getClickInfo(e) {
            // 创建地理编码实例
            const myGeo = new BMap.Geocoder();
            // 根据坐标逆解析地址
            myGeo.getLocation(new BMap.Point(e.point.lng, e.point.lat), (result) => {
                console.log(result, "result-->>>>");
                if (result) {
                this.address = result.address;
                }
            });
            this.center.lng = e.point.lng;
            this.center.lat = e.point.lat;
        },
        syncCenterAndZoom(e) {
            console.log(e.target, 'e.target-->>>>')
            const { lng, lat } = e.target.getCenter();
            this.zoom = e.target.getZoom();
        },
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
            }
        }
    }
</style>
