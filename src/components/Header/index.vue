<template>
  <div id="Blog_Header">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/home/blog_list"
        ><router-link class="link" to="/home/blog_list">
          首页
        </router-link></el-menu-item
      >
      <el-menu-item index="/home/publish"
        ><router-link class="link" to="/home/publish">
          发布文章
        </router-link></el-menu-item
      >
      <div class="temp"></div>
      <el-button
        type="danger"
        icon="el-icon-close"
        circle
        style="float: right; margin: 10px"
        @click="exit"
      ></el-button>
      <el-button
        type="primary"
        round
        style="float: right; margin: 10px"
        @click="toSpace"
        >个人中心</el-button
      >
      <el-avatar :src="circleUrl" class="h-icon"></el-avatar>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: "请登录",
      // 头像图片url
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      //搜索栏关键词
      search: "",
    };
  },
  methods: {
    toSpace() {
      //跳转到个人中心页面
      this.$router.push("/space");
    },
    //退出登录
    exit() {
      this.$store.dispatch("userLogout");
      this.$router.push("/login");
    },
    //点击菜单触发的函数
    handleSelect(key, keyPath) {
      console.log("当前菜单路径：");
      console.log(key, keyPath);
    },
  },
  mounted() {},
  created() {
    if (localStorage.getItem("USERINFO")) {
      this.username = JSON.parse(localStorage.getItem("USERINFO")).user_name;
      this.circleUrl = JSON.parse(localStorage.getItem("USERINFO")).user_avatar;
    }
  },
  components: {},
};
</script>

<style scoped>
.link {
  text-decoration: none;
}
#Blog_Header {
  min-width: 1330px;
}
.el-menu-demo {
  padding-left: 15%;
  padding-right: 15%;
}
.h-icon {
  size: 40px;
  margin: 10px;
  float: right;
}
.temp {
  width: 500px;
  margin: 10px;
  background-color: rgb(212, 212, 212);
  float: left;
}
</style>