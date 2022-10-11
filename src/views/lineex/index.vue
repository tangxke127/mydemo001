<template>
    <div>
        <div>
            <h1>折线图</h1>
            <div id="chartline" ref="chart" :style="{ width: '900px', height: '500px' }"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import dataJson from './data1.json'
export default {
    data () {
        return {
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
            option: {
                title: {
                    // text: '震波',
                    // text: '折线图',
                    text: dataJson.channelType,
                    left: '1%'
                },
                animation: true,
                tooltip: {
                    showDelay: 0,
                    trigger: 'axis'
                },
                xAxis: {
                    // data: dataJson.map(function (item) {
                    //     return item[0]
                    // })
                    data:dataJson.xAxisTimes
                },
                grid: {
                    top: '20%',
                    bottom: '20%'
                },
                yAxis: {
                // min: -90,
                // max: 90
                min:462200, // 起始
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
                            // {
                            //     yAxis: 50
                            // },
                            // {
                            //     yAxis: 100
                            // },
                            // {
                            //     yAxis: 150
                            // },
                            // {
                            //     yAxis: 200
                            // },
                            // {
                            //     yAxis: 300
                            // }
                            {
                                yAxis: 462365
                            }
                        ]
                    },
                    // data: dataJson.map(function (item) {
                    //     return item[1]
                    // })
                    data:dataJson.yAxisDatas
                }]
            }
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            // console.log('rewqre',this.$echarts)
            let chartline = echarts.init(document.getElementById('chartline'))
            chartline.setOption(this.option)
        }
    }
}

</script>
<style lang="less" scoped>
</style>
