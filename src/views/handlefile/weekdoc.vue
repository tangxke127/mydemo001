<template>
    <!-- <div>导出文档</div> -->
    <div class="all">
        <!-- <div class="all"> -->
		<div class="header">导出</div>
        <div class="body">
            <!-- <Collapse v-model="form"> -->
            <Collapse>
                <Panel name="name">
                    第一步：输入名称
                    <template #content>
                        <div style="display:flex">
                            <span style="width:50px;font-weight:bold;font-size:15px;margin-top:8px">
                                姓名：
                            </span>
                            <Input v-model="form.userName"></Input>
                        </div>
                    </template>
                </Panel>
                <Panel name="date">
                    第二步：选择日期
                    <template #content>
                        <DatePicker 
                            v-model="form.date" 
                            :options="options2"
                            @on-change="form.date = $event" 
                            type="daterange" 
                            placement="bottom-start" 
                            placeholder="选择时间范围" 
                            style="width: 300px" />
                    </template>
                </Panel>
                <Panel name="formdata">
                    第三步：填写表单
                    <template #content>
                        <div style="text-align:center">
                            <Form ref="form" :label-width="120">
                                <Card style="margin:5px">
                                    <FormItem
                                    label="本周项目名称："
                                        prop="thisweek"
                                        >
                                        <Input v-model="form.thistask"></Input>
                                    </FormItem>
                                    <FormItem
                                        label="本周工作："
                                        prop="thisweek"
                                        >
                                        <Input type="textarea" :autosize="{minRows: 4}"  v-model="form.thisweek"></Input>
                                    </FormItem>
                                </Card>
                                <Card style="margin:5px">
                                    <FormItem
                                        label="下周项目名称："
                                        prop="nextweek"
                                        >
                                        <Input v-model="form.nexttask"></Input>
                                    </FormItem>
                                    <FormItem
                                        label="下周工作："
                                        prop="nextweek"
                                        >
                                        <Input type="textarea" :autosize="{minRows: 4}"  v-model="form.nextweek"></Input>
                                    </FormItem>
                                </Card>
                            </Form>
                        </div>
                    </template>
                    <!-- <template #content>斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</template> -->
                </Panel>
                <!-- <Panel name="3">
                    乔纳森·伊夫
                    <template #content>乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</template>
                </Panel> -->
            </Collapse>
                <Button
                    style="margin:20px"
                    type="primary"
                    @click="onSubmit('form')"
                    >导出</Button
                >
        </div>
    </div>
</template>

<script>
import JSZipUtils from 'jszip-utils'
import JSZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
export default {
    data () {
        return {
            form: {
                userName: "",
                date: "",
                thistask:"",
                thisweek:"",
                nexttask:"",
                nextweek:"",

            },
            options2: {
                    shortcuts: [
                        {
                            text: '本周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 5);
                                return [start, end];
                            }
                        },
                        // {
                        //     text: '1 month',
                        //     value () {
                        //         const end = new Date();
                        //         const start = new Date();
                        //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        //         return [start, end];
                        //     }
                        // },
                        // {
                        //     text: '3 months',
                        //     value () {
                        //         const end = new Date();
                        //         const start = new Date();
                        //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        //         return [start, end];
                        //     }
                        // }
                    ]
                }
            // table:[{
            //         name:"aaa",
            //         value:"111"
            //     },{
            //         name:"bbb",
            //         value:"222"
            //     }]
        }
    },
    methods: {
    onSubmit(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
          this.exportWord();
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    },
    exportWord() {
      const _this = this
      JSZipUtils.getBinaryContent('week.docx', function(error, content) {
        // 抛出异常
        if (error) {
          throw error
        }
        // 创建一个JSZip实例，内容为模板的内容
        let zip = new JSZip(content)
        // 创建并加载docxtemplater实例对象
        let doc = new Docxtemplater().loadZip(zip)
        // 设置模板变量的值
        doc.setData({
          ..._this.form,
		//   table:_this.table
        })
        try {
          // 用模板变量的值替换所有模板变量
          doc.render()
        } catch (error) {
          // 抛出异常
          // let e = {
          //   message: error.message,
          //   name: error.name,
          //   stack: error.stack,
          //   properties: error.properties,
          // }
          this.$message.error('导出报表失败')
          throw error
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, '周报.docx')
      })
    },
  }
}

</script>
<!-- <style scoped> -->
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
            // text-align: center;
            padding:20px;
            // .chartsty{
            //     width: 95%;
            //     height: 500px;  
            // }
        }
    }
</style>
