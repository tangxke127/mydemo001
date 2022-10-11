<template>
   <div class="all">
		<div class="header">连接信息配置表编辑</div>
		<div class="body">
            <div class="content">
                <Form :model="formItem" :label-width="150">
                    <Row>
                        <Col span="12" >
                            <FormItem label="id">
                                <Input v-model="formItem.id" placeholder="序号"></Input>
                            </FormItem>
                            <!-- 服务器地址 -->
                            <FormItem label="服务器地址">
                                <Input v-model="formItem.sladdr" placeholder="请输入服务器地址"></Input>
                            </FormItem>
                            <!-- 多台站选择器 -->
                            <FormItem label="多台站选择器">
                                <Select v-model="formItem.multiselect">
                                    <Option value="multiselect1">multiselect1</Option>
                                    <Option value="multiselect2">multiselect2</Option>
                                    <Option value="multiselect3">multiselect3</Option>
                                </Select>
                            </FormItem>
                            <!-- 单站选择器 -->
                            <FormItem label="单站选择器">
                                <Select v-model="formItem.selectors">
                                    <Option value="selectors1">selectors1</Option>
                                    <Option value="selectors5">selectors2</Option>
                                    <Option value="selectors3">selectors3</Option>
                                </Select>
                            </FormItem>
                            <!-- 时间流开始时间 -->
                            <FormItem label="时间流开始时间">
                                <DatePicker v-model="formItem.beginTime" type="date" placeholder="选择开始时间" ></DatePicker>
                            </FormItem>
                            <!-- 时间流结束时间 -->
                            <FormItem label="时间流结束时间">
                                <DatePicker v-model="formItem.beginTime" type="date" placeholder="选择结束时间" ></DatePicker>
                            </FormItem>
                            <!-- 时间间隔 -->
                            <FormItem label="时间间隔">
                                <Select v-model="formItem.keepalive">
                                    <Option value="1分钟">1分钟</Option>
                                    <Option value="5分钟">5分钟</Option>
                                    <Option value="10分钟">10分钟</Option>
                                </Select>
                            </FormItem>
                            <!-- 超时时间 -->
                            <FormItem label="超时时间">
                                <Select v-model="formItem.netto">
                                    <Option value="0">0</Option>
                                    <!-- /***默认600s****/ -->
                                    <Option value="600s">600s</Option>  
                                    <Option value="1000s">1000s</Option>
                                </Select>
                            </FormItem>
                            <!-- 重新连接延迟时间 -->
                            <FormItem label="重新连接延迟时间">
                                <Select v-model="formItem.netdly">
                                    <Option value="0">0</Option>
                                    <!-- /***默认30s****/ -->
                                    <Option value="30s">30s</Option>  
                                    <Option value="100s">100s</Option>
                                </Select>
                            </FormItem>
                            <!-- INFO等级 -->
                            <FormItem label="INFO等级">
                                <Select v-model="formItem.infolevel">
                                    <Option value="STREAMS">STREAMS</Option>
                                    <Option value="GAPS">GAPS</Option>  
                                    <Option value="CONNECTIONS">CONNECTIONS</Option>
                                    <Option value="ALL">ALL</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="11" >
                            <!-- 状态文件地址 -->
                            <FormItem label="状态文件地址">
                                <Input v-model="formItem.statefile" placeholder="请输入状态文件地址"></Input>
                            </FormItem>
                            <!-- 流列表文件 -->
                            <FormItem label="流列表文件">
                                <Input v-model="formItem.streamfile" placeholder="请输入流列表文件"></Input>
                            </FormItem>
                            <!-- 是否打印 -->
                            <FormItem label="是否打印">
                                <RadioGroup v-model="formItem.ppackets">
                                    <Radio label="是">是</Radio>
                                    <Radio label="否">否</Radio>
                                </RadioGroup>
                            </FormItem>
                            <!-- 打印级别 -->
                            <FormItem label="打印级别">
                                <Select v-model="formItem.verbose">
                                    <Option value="0">0</Option>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                </Select>
                            </FormItem>
                            <!-- 创建者 -->
                            <FormItem label="创建者">
                                <Input v-model="formItem.createBy" placeholder="创建者"></Input>
                            </FormItem>
                            <!-- 创建时间 -->
                            <FormItem label="创建时间">
                                <Input v-model="formItem.createTime" placeholder="创建时间"></Input>
                            </FormItem>
                            <!-- 更新者 -->
                            <FormItem label="更新者">
                                <Input v-model="formItem.updateBy" placeholder="更新者"></Input>
                            </FormItem>
                            <!-- 更新时间 -->
                            <FormItem label="更新时间">
                                <Input v-model="formItem.updateTime" placeholder="更新时间"></Input>
                            </FormItem>
                            <!-- 删除标志 -->
                            <FormItem label="删除标志">
                                <Input v-model="formItem.delFlag" placeholder="删除标志"></Input>
                                <!-- <Select v-model="formItem.verbose">
                                    <Option value="beijing">0</Option>
                                    <Option value="shanghai">1</Option>
                                    <Option value="shenzhen">2</Option>
                                </Select> -->
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div class="handle">
                <Button type="primary" style="margin-right:20px">确定</Button>
                <Button  @click="cancel">取消</Button>
            </div>
		</div>
	</div>
</template>

<script>
import list from "./data.json"
export default {
    data () {
        return {
            formItem:{},
            data:list.data
        }
    },
    created(){
        console.log('33333333',this.$route.params.id)
        if(this.$route.params.id){
            let id = this.$route.params.id
            console.log('ewrewr',this.data)
            this.data.forEach(item =>{
                if(item.id === id)
                this.formItem = item
            })
        }
    },
    methods:{
        // 跳转回连接信息配置表
        cancel(){
            this.$router.push({
                name:"connect",
                // params:{id:id}
            });
        }
    }
}

</script>
<style lang="less" scoped>
    .all{
		// padding:10px;

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
			// .handle{
			// 	margin:20px;
			// }
			// .table{
			// 	margin:5px;
			// }
            .content{
                // width: 100%;
                // display: flex;
                // margin: 0 auto;
                margin:20px;
            }
            .handle{
                // margin:20px;
                // background: pink;
                width: 10%;
                margin: 0 auto;
                padding-bottom:20px;
            }
		}
    }
</style>
