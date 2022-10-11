<template>
	<div class="all">
		<div class="header">连接信息配置表</div>
		<div class="body">
			<div class="handle">
				<Form>
					<Row type="flex" >
						<Col span="6">
							<FormItem>
							<span>服务器地址：</span>
							<Input
								v-model="sladdr"
								placeholder="请输入服务器地址"
								style="width: 270px"
							></Input>
							</FormItem>
						</Col>
						<Col span="6">
							<FormItem>
								<span>INFO等级：</span>
								<Select v-model="infolevel" style="width: 270px">
									<Option value="STREAMS">STREAMS</Option>
                                    <Option value="GAPS">GAPS</Option>  
                                    <Option value="CONNECTIONS">CONNECTIONS</Option>
                                    <Option value="ALL">ALL</Option>
                                </Select>
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
                        title: '服务器地址',
                        key: 'sladdr'
                    },
                    {
                        title: '多台站选择器',
                        key: 'multiselect'
                    },
					{
                        title: '单站选择器',
                        key: 'selectors'
                    },
                    {
                        title: '时间流开始时间',
                        key: 'beginTime',
						render:(h,params) =>{
                          return h('div',{},
                            this.changeDate(params.row.beginTime)
                          )
                        }
                    },
                    {
                        title: '时间流结束时间',
                        key: 'endTime'
                    },
					{
                        title: '时间间隔',
                        key: 'keepalive'
                    },
                    {
                        title: '超时时间',
                        key: 'netto'
                    },
                    {
                        title: '重新连接延迟时间',
                        key: 'netdly'
                    },
					{
                        title: 'INFO等级',
                        key: 'infolevel'
                    },
					{
                        title: '状态文件地址',
                        key: 'statefile'
                    },
					{
                        title: '流列表文件',
                        key: 'streamfile'
                    },
					{
                        title: '是否打印',
                        key: 'ppackets'
                    },
					{
                        title: '打印级别',
                        key: 'verbose'
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
			sladdr:'',
			infolevel:'',
			dataCount:0, //数据总量
			currentPageNum:1, //当前页数
			pageSize: 5, //每页条数
        }
    },
	created(){
		this.dataCount = this.data.length
	},
	methods:{
		// 查询
		search(){
			this.currentPageNum = 1
			this.data = this.list.data
			this.dataCount = this.data.length
			// 单独过滤sladdr
			if(this.sladdr && !this.infolevel){
				let list = this.list.data.filter(item =>
					item.sladdr.includes(this.sladdr)
				)
				this.data = list
				this.dataCount = list.length
			}else if(!this.sladdr && this.infolevel){
				let list = this.list.data.filter(item =>
					item.infolevel.includes(this.infolevel)
				)
				this.data = list
				this.dataCount = list.length
			}else if(this.sladdr && this.infolevel){
				let list1 = this.list.data.filter(item =>
					item.sladdr.includes(this.sladdr)
				)
				let list2 = list1.filter(item =>
					item.infolevel.includes(this.infolevel)
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
			this.sladdr = ''
			this.infolevel = ''
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
				name:"connectedit",
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
