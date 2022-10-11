<template>
<div>
  <Tabs>
    <TabPane label="基础表单行列展示">
      <multi-rank />
    </TabPane>
    <TabPane label="表格">
      <form-table />
    </TabPane>
    <TabPane label="基础表单控件">
      <form-group />
    </TabPane>
  </Tabs>
</div>
</template>
<script>
import MultiRank from './multi-column/index.vue'
import FormTable from './table-demo/index.vue'
import FormGroup from './form-group/index.vue'
export default {
  components: { MultiRank, FormTable, FormGroup },
  data () {
    return {
      isHidden: true,
      timeout: null
    }
  },
  mounted () {
    this.goHidden()
  },
  methods: {
    toggleHidden () {
      this.$store.state.shake.isshake = true
    },
    goHidden () {
      this.timeout = setTimeout(() => {
        this.isHidden = false
        this.$store.state.shake.isshake = true
      }, 1000 * 60 * 2)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
    this.$store.state.shake.isshake = false
  }
}
</script>
