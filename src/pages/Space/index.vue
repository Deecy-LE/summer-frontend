<template>
  <div>
    <Header></Header>
    <div class="navbar">
      <div class="info">
        <span style="font-weight: bold"> 用户信息</span>
        <div style="line-height: 23px">uid</div>
        <div class="logout">
          完成操作后请点击&nbsp;
          <a href="#/login" style="color: blue" @click="logout">[安全退出]</a>
        </div>
      </div>

      <el-col :span="100">
        <el-menu default-active="2" background-color="#2c3e50" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>操作</span>
            </template>
            <el-menu-item-group>
              <router-link :to="tag1">
                <el-menu-item index="1-1">查看子组件1</el-menu-item>
              </router-link>
              <router-link :to="tag2">
                <el-menu-item index="1-2">查看子组件2</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>
    <div class="main">
      <router-view :key="new Date().getTime()"></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import {
  get_logout,
} from "@/api";
export default {
  name: "",
  data() {
    return {
      tag1: "/space/submodule1",
      tag2: "/space/submodule2"
    };
  },
  beforeMount() { },
  mounted() {

  },
  methods: {
    async logout() {
      let result = await get_logout()
      let toPath = "/login";
      this.$router.push(toPath);
      console.log(result.msg);
    }
  },

  computed: {

  },
};
</script>

<style scoped>
/* 左侧样式 */
.navbar {
  position: absolute;
  width: 230px;
  top: 80px;
  /* 距离上面50像素 */
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  /* 当内容过多时y轴出现滚动条 */
  overflow-x: hidden;
  background-color: #2c3e50;
}

.info {
  background: #8ac3f0 repeat-x;
  color: black;
}

.logout {
  color: indianred;
  font-weight: bold;
  line-height: 23px
}

/* 主区域 */
.main {
  position: absolute;
  top: 80px;
  left: 230px;
  bottom: 0px;
  right: 0px;
  /* 距离右边0像素 */
  padding: 10px;
  overflow-y: auto;
  /* 当内容过多时y轴出现滚动条 */
  overflow-x: auto;
  background-color: rgb(236, 235, 235);
}
</style>

