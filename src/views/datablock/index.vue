<template>
	<div class="all">
		<div class="header">数据块信息表</div>
		<div class="body">
			<div class="handle">
				<Form>
					<Row type="flex" >
						<Col span="6">
							<FormItem>
                                <span>块类型：</span>
                                <Select v-model="blocketteType" style="width: 270px">
                                    <Option value="类型一">类型一</Option>
                                    <Option value="类型二">类型二</Option>
                                    <Option value="类型三">类型三</Option>
                                    <Option value="999">999</Option>
                                </Select>
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem>
							<span>通道标识符：</span>
							<Input
								v-model="channelIdentifier"
								placeholder="请输入通道标识符"
								style="width: 270px"
							></Input>
							</FormItem>
						</Col>
						<Col span="6">
							<div class="butQuery">
							<Button style="margin-right:8px" @click="reset">重置</Button>
							<Button type="primary" @click="search">查询</Button>
							</div>
						</Col>
					</Row>
					<!-- <Row type="flex" justify="start" style="margin-bottom:10px">
						<Button type="primary">新建</Button>
					</Row> -->
				</Form>
			</div>
			<div class="table">
				<Table border :columns="columns" :data="data.slice((currentPageNum - 1)*pageSize,currentPageNum*pageSize)"></Table>
				<Row type="flex" justify="end">
					<Page
					:current="currentPageNum"
					:total="dataCount"
					:page-size="pageSize"
					@on-change="pageChange"
					show-elevator
					show-total
					style="padding: 10px"
					></Page>
              	</Row>
			</div>
			
		</div>
	</div>
</template>

<script>
import list from "./data.json"
export default {
    data () {
        return {
			columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: '块类型',
                        key: 'blocketteType'
                    },
                    {
                        title: '质量指示符',
                        key: 'qualityIndicator'
                    },
					{
                        title: '数据到达时间',
                        key: 'dataArrivalTime',
                        render:(h,params) =>{
                          return h('div',{},
                            this.changeDate(params.row.dataArrivalTime)
                          )
                        }
                    },
                    {
                        title: '台站标识符',
                        key: 'stationIdentifierCode'
                    },
                    {
                        title: '位置标识符',
                        key: 'locationIdentifier'
                    },
					{
                        title: '通道标识符',
                        key: 'channelIdentifier'
                    },
                    {
                        title: '台网编码',
                        key: 'networkCode'
                    },
                    {
                        title: '记录起始时间',
                        key: 'recordStartTime',
                        render:(h,params) =>{
                          return h('div',{},
                            this.changeDate(params.row.recordStartTime)
                          )
                        }
                    },
					{
                        title: '样本数目',
                        key: 'samplesNum'
                    },
					{
                        title: '采样率因子',
                        key: 'sampleRateFactor'
                    },
					{
                        title: '采样率乘数',
                        key: 'sampleRateMultiplier'
                    },
					{
                        title: '活动标志',
                        key: 'activityFlags'
                    },
					{
                        title: 'I/O和时钟标志',
                        key: 'ioClockFlags'
                    },
					{
                        title: '数据质量标志',
                        key: 'dataQualityFlags'
                    },
					{
                        title: '子块数目',
                        key: 'blockettesNum'
                    },
					{
                        title: '时间校正值',
                        key: 'timeCorrection'
                    },
					{
                        title: '数据开始偏移量',
                        key: 'dataBegin'
                    },
					{
                        title: '第一个子块',
                        key: 'firstBlockette'
                    },
					{
                        title: '创建者',
                        key: 'createBy'
                    },
					{
                        title: '创建时间',
                        key: 'createTime'
                    },
					{
                        title: '更新者',
                        key: 'updateBy'
                    },
					{
                        title: '更新时间',
                        key: 'updateTime'
                    },
					{
                        title: '删除标志',
                        key: 'delFlag'
                    },
					{
                    title: '操作',
                    align: 'center',
                    slot: 'action',
                    width: 80,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        // marginRight: '15px'
                                    },
                                    on: {
										// 跳转编辑页面
                                        click: () => {
                                            this.handleEdit(params.row.id, params.index)
                                        }
                                    }
                                },
                                '编辑'
                            ),
                            
                        ])
                    }
                }
			],
            list:list,
			data:list.data,
			blocketteType:'',
			channelIdentifier:'',
            dataCount:0, //数据总量
			currentPageNum:1, //当前页数
			pageSize: 5, //每页条数
        }
    },
	created(){
		console.log('eeeee',this.data)
        this.dataCount = this.data.length
	},
	methods:{
        // 搜索
        search(){
            this.currentPageNum = 1
			this.data = this.list.data
			this.dataCount = this.data.length
            // 单独过滤blocketteType
			if(this.blocketteType && !this.channelIdentifier){
				let list = this.list.data.filter(item =>
					item.blocketteType.includes(this.blocketteType)
				)
				this.data = list
				this.dataCount = list.length
			}else if(!this.blocketteType && this.channelIdentifier){
				let list = this.list.data.filter(item =>
					item.channelIdentifier.includes(this.channelIdentifier)
				)
				this.data = list
				this.dataCount = list.length
			}else if(this.blocketteType && this.channelIdentifier){
				let list1 = this.list.data.filter(item =>
					item.blocketteType.includes(this.blocketteType)
				)
				let list2 = list1.filter(item =>
					item.channelIdentifier.includes(this.channelIdentifier)
				)
				this.data = list2
				this.dataCount = list2.length
			}
        },
        // 重置
		reset(){
			this.data = this.list.data
			this.dataCount = this.data.length
			this.currentPageNum = 1
			this.blocketteType = ''
			this.channelIdentifier = ''
		},
        // 时间格式处理
		changeDate(oldDate) {
			if(oldDate){
				var dateee = new Date(oldDate).toJSON()
				var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
				return oldDate == '' ? '' : date
			}
		},
        // 编辑跳转
		handleEdit(id,index){
			this.$router.push({
                name:"blockedit",
                params:{id:id}
            });
		},
        // 分页跳转
		pageChange(val){
			this.currentPageNum = val
		},
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
			.handle{
				margin:20px 20px 0 20px;
			}
			.table{
				margin:0 15px;
			}
		}
	}
</style>
