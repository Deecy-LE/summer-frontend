<template>
  <div id="Blog_Header">
    <el-menu
      :default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1"><router-link class="link" to="/home/blog_list"> 首页 </router-link></el-menu-item>
      <el-menu-item index="2"><router-link class="link" to="/home/publish"> 发布文章 </router-link></el-menu-item>
      <el-input
        placeholder="想要什么，搜搜看吧"
        v-model="search"
        class="input-with-select"
        ><el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button round style="float: right; margin: 10px">个人中心</el-button>
      <el-avatar :src="circleUrl" class="h-icon"></el-avatar>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Blog_Header",
  data() {
    return {
      // 头像图片url
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
};
</script>

<style scoped>
.link{
    text-decoration: none;
}
#Blog_Header {
  min-width: 1300px;
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
.input-with-select {
  width: 500px;
  margin: 10px;
  background-color: rgb(212, 212, 212);
  float: left;
}
</style>