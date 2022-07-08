<template>
  <div id="home">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import { get_space } from "@/api";
import { homedir } from "os";
import Header from "../../components/Header/Blog_Header";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    Header,
  },
  methods: {
    async visit_space() {
      let result = await get_space();
      if (result.code == 1) {
        //已登录成功
        let toPath = "/space";
        this.$router.push(toPath);
      } else {
        //未登录
        let toPath = "/login";
        this.$router.push(toPath);
        alert(result.msg);
      }
    },
    openNewWindow(e) {
      let uid = e.target.innerText;
      let routeUrl = this.$router.resolve({
        path: "/home/" + uid,
      });
      window.open(routeUrl.href, "_blank");
    },
    loadPageData: function () {
      console.log(this.$route.params.uid);
      // axios 请求页面数据 .then 中将状态值修改  this.isLoading = false
      this.hide = false;
    },
  },
  mounted() {
    const me = this;
    me.loadPageData();
  },
};
</script>


<style scoped>
#home {
  background-color: rgb(224, 221, 221);
  height: 150vh;
}
</style>


