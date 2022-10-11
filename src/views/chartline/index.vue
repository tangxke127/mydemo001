<template>
    <div class="all">
        <!-- <div class="all"> -->
		<div class="header">折线图</div>
        <div class="body">
            <div id="chartline" ref="chart" class="chartsty"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import dataJson from './data.json'
export default {
    data () {
        return {
            // path:'',
            // path:"ws://localhost:9000",
            // ws://ip:9000/ws/msg/admin    
            // path: 'ws://192.168.45.241:9001/websocket/1',
            // path: 'ws://192.168.51.225:9000/ws/msg/admin', //
            datamsg:{
                yAxisDatas:[],
                xAxisTimes:[],
                channelType:'',
            },
            option1: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis'
                },
                series: [
                    {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                    }
                ]
            },
            
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.lineopen()
        },
        lineopen(){
            let option = {
                title: {
                    text: '震波',
                    // text:this.datamsg.dataType + this.datamsg.channelType,
                    left: '1%'
                },
                animation: true,
                tooltip: {
                    showDelay: 0,
                    trigger: 'axis'
                },
                xAxis: {
                    data: dataJson.map(function (item) {
                        return item[0]
                    })
                    // data:dataJson.xAxisTimes
                    // data:dataJson[0]
                },
                grid: {
                    top: '20%',
                    bottom: '20%'
                },
                yAxis: {
                // min: -90,
                // max: 90
                // min:462200, // 起始
                },
                toolbox: {
                    right: 10,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                // 区域缩放
                dataZoom: [
                    {
                        startValue: '2014-06-01' //数据窗口范围的起始数值
                    },
                    {
                        type: 'inside'
                    }
                ],
                // 折线图具体设置
                series: [{
                    name: '',
                    type: 'line',
                    showSymbol: false,
                    clip: true, //是否裁剪超出坐标系部分的图形
                    markLine: { //图表标线
                        silent: true, //响应和触发鼠标事件
                        lineStyle: { //标线样式
                            color: '#333'
                            // color: 'red'
                        },
                        data: [ //具体标线数据位置
                            {
                                yAxis: 50
                            },
                            {
                                yAxis: 100
                            },
                            {
                                yAxis: 150
                            },
                            {
                                yAxis: 200
                            },
                            {
                                yAxis: 300
                            }
                            // {
                            //     yAxis: 462365
                            // }
                        ]
                    },
                    // data:dataJson[1]
                    data: dataJson.map(function (item) {
                        return item[1]
                    })
                }]
            }
            let chartline = echarts.init(document.getElementById('chartline'))
            chartline.setOption(option)
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
			height: calc(100% - 50px);
            line-height: 100%;
            text-align: center;
            padding:20px;
            .chartsty{
                width: 95%;
                height: 500px;  
            }
        }
    }
</style>
