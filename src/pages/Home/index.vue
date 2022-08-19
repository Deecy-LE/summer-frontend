<!-- 主页 -->
<template>
  <div id="home">
    <!-- 头部导航栏 -->
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
  },
  methods: {
  },
  mounted() {
  },
};
</script>


<style scoped>
#home {
  background: linear-gradient(200deg, #e7eff3, #d4e2f8);
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>


