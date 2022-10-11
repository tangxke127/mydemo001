<template>
    <!-- <div>导出文档</div> -->
    <div class="all">
        <!-- <div class="all"> -->
		<div class="header">导出表格</div>
        <div class="body">
            <!-- <div id="chartline" ref="chart" class="chartsty"></div> -->
            <Form ref="form" :model="form" :label-width="80">
                <FormItem
                label="用户名称"
                prop="userName"
                >
                <Input v-model="form.userName"></Input>
                </FormItem>
                <FormItem
                label="值"
                prop="value"
                >
                <Input v-model="form.value"></Input>
                </FormItem>
                <FormItem>
                <Button
                    style="background-color: #1094cb;"
                    type="primary"
                    @click="onSubmit('form')"
                    >导出</Button
                >
                </FormItem>
            </Form>
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
                value: ""
            },
            table:[{
                    name:"aaa",
                    value:"111"
                },{
                    name:"bbb",
                    value:"222"
                }]
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
      JSZipUtils.getBinaryContent('test.docx', function(error, content) {
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
		  table:_this.table
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
        saveAs(out, '测试.docx')
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
            text-align: center;
            padding:20px;
            // .chartsty{
            //     width: 95%;
            //     height: 500px;  
            // }
        }
    }
</style>
