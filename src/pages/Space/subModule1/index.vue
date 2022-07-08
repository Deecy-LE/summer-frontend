<template>
  <div>
      <h2>Test子组件1</h2>
      <loading v-if="hide"></loading>
  </div>
</template>



<script>

export default {
    data() {
        return {
          hide:true
        };
    },
    computed: {},
    mounted() {
      const me = this
      me.loadPageData()
    },
    methods: {
      loadPageData(){
      // axios 请求页面数据 .then 中将状态值修改  this.isLoading = false
      this.hide=false
    },
    },
};
</script>

<style scoped>
</style>

