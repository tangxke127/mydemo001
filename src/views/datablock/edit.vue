<template>
   <div class="all">
		<div class="header">数据块信息表编辑</div>
		<div class="body">
            <div class="content">
                <Form :model="formItem" :label-width="150">
                    <Row>
                        <Col span="12" >
                            <FormItem label="id">
                                <Input v-model="formItem.id" placeholder="序号"></Input>
                            </FormItem>
                            <!-- 块类型 -->
                            <FormItem label="块类型">
                                <Select v-model="formItem.blocketteType">
                                    <Option value="类型一">类型一</Option>
                                    <Option value="类型二">类型二</Option>
                                    <Option value="类型三">类型三</Option>
                                    <Option value="999">999</Option>
                                </Select>
                            </FormItem>
                            <!-- 质量指示符 -->
                            <FormItem label="质量指示符">
                                <Input v-model="formItem.qualityIndicator" placeholder="请输入质量指示符"></Input>
                            </FormItem>
                            <!-- 数据到达时间 -->
                            <FormItem label="数据到达时间">
                                <DatePicker v-model="formItem.dataArrivalTime" type="date" placeholder="选择开始时间" ></DatePicker>
                            </FormItem>
                            <!-- 台站标识符 -->
                            <FormItem label="台站标识符">
                                <Input v-model="formItem.stationIdentifierCode" placeholder="请输入台站标识符"></Input>
                            </FormItem>
                            <!-- 位置标识符 -->
                            <FormItem label="位置标识符">
                                <Input v-model="formItem.locationIdentifier" placeholder="请输入位置标识符"></Input>
                            </FormItem>
                            <!-- 通道标识符 -->
                            <FormItem label="通道标识符">
                                <Input v-model="formItem.channelIdentifier" placeholder="请输入通道标识符"></Input>
                            </FormItem>
                            <!-- 台网编码 -->
                            <FormItem label="台网编码">
                                <Input v-model="formItem.networkCode" placeholder="请输入台网编码"></Input>
                            </FormItem>
                            <!-- 记录起始时间 -->
                            <FormItem label="记录起始时间">
                                <DatePicker v-model="formItem.recordStartTime" type="date" placeholder="选择开始时间" ></DatePicker>
                            </FormItem>
                            <!-- 样本数目 -->
                            <FormItem label="样本数目">
                                <Input v-model="formItem.samplesNum" placeholder="请输入样本数目"></Input>
                            </FormItem>
                            <!-- 采样率因子 -->
                            <FormItem label="采样率因子">
                                <Input v-model="formItem.sampleRateFactor" placeholder="请输入采样率因子"></Input>
                            </FormItem>
                            <!-- 采样率乘数 -->
                            <FormItem label="采样率乘数">
                                <Input v-model="formItem.sampleRateMultiplier" placeholder="请输入采样率乘数"></Input>
                            </FormItem>
                           
                        </Col>
                        <Col span="11" >
                          <!-- 活动标志 -->
                          <FormItem label="活动标志">
                                <Input v-model="formItem.activityFlags" placeholder="请输入活动标志"></Input>
                            </FormItem>
                            <!-- I/O和时钟标志 -->
                            <FormItem label="'I/O和时钟标志">
                                <Input v-model="formItem.ioClockFlags" placeholder="请输入'I/O和时钟标志"></Input>
                            </FormItem>
                            <!-- 数据质量标志 -->
                            <FormItem label="数据质量标志">
                                <Input v-model="formItem.dataQualityFlags" placeholder="请输入数据质量标志"></Input>
                            </FormItem>
                            <!-- 子块数目 -->
                            <FormItem label="子块数目">
                                <Input v-model="formItem.blockettesNum" placeholder="请输入子块数目"></Input>
                            </FormItem>
                            <!-- 时间校正值 -->
                            <FormItem label="时间校正值">
                                <Input v-model="formItem.timeCorrection" placeholder="请输入时间校正值"></Input>
                            </FormItem>
                            <!-- 数据开始偏移量 -->
                            <FormItem label="数据开始偏移量">
                                <Input v-model="formItem.dataBegin" placeholder="请输入数据开始偏移量"></Input>
                            </FormItem>
                            <!-- 第一个子块 -->
                            <FormItem label="第一个子块">
                                <Input v-model="formItem.firstBlockette" placeholder="请输入第一个子块"></Input>
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
                                <!-- <Input v-model="formItem.delFlag" placeholder="删除标志"></Input> -->
                                <Select v-model="formItem.delFlag">
                                    <Option value="0">0</Option>
                                    <Option value="1">1</Option>
                                </Select>
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
                name:"datablock",
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
