<!-- 首页帖子列表 -->
<template>
  <div class="bg">
    <div class="h_block" v-loading="show">
      <div class="search">
        <el-input
          placeholder="想看什么，搜搜看吧"
          v-model="search_input"
          class="input-with-select"
          ><el-button
            slot="append"
            icon="el-icon-search"
            @click="search_blog"
          ></el-button>
        </el-input>
        <el-button class="back" :style="{ display: back }" @click="comeback"
          >返回</el-button
        >
      </div>
      <ul class="h_list" v-if="blogs.length != 0">
        <li class="h_item" v-for="blog in blogsRst" :key="blog.id">
          <div class="h_content">
            <div class="h_user">
              <div>
                <el-avatar
                  :src="blog.user_avatar"
                  class="h-icon"
                  fit="cover"
                ></el-avatar>
              </div>
              <div>
                <span>{{ blog.user_name }}</span>
              </div>
            </div>
            <div>
              <div class="h_text">
                <span>
                  <router-link
                    :to="{ name: 'Detail', params: { blog_id: blog.blog_id } }"
                  >
                    {{ blog.text }}
                  </router-link>
                </span>
              </div>
              <div class="h_meta">
                <span>{{ time(blog.createTimeStamp) }}</span>
                &emsp;
                <span>点赞：{{ blog.like }}</span>
              </div>
            </div>
          </div>
          <div class="h_image" v-if="blog.imgs">
            <el-image
              class="h_img"
              :src="show_image(blog.imgs)"
              fit="cover"
              alt="el-icon-picture"
            >
            </el-image>
          </div>
        </li>
      </ul>
      <div v-if="loading"><i class="el-icon-loading"></i></div>
      <div v-if="noMore">没有更多内容了</div>
    </div>
  </div>
</template>

<script>
import { get_blog_home } from "@/api";
import { InfiniteScroll } from "element-ui";
import { parseTime } from "@/utils/date";
// 定义一个定时器名称，用来存储与销毁定时器
let timer = null;
export default {
  name: "Blog_List",
  directives: { "infinite-scroll": InfiniteScroll },
  data() {
    return {
      blogs: [],
      blogsRst: [], //搜索筛选后的博客
      back: "none",
      show: false,
      noMore: false,
      loading: false,
      search_input: "",
    };
  },
  methods: {
    /**
     * 时间戳转日期格式
     */
    time(timeStamp) {
      return parseTime(timeStamp);
    },
    /**
     * 搜索
     */
    search_blog() {
      let keyword = this.search_input;
      console.log("关键字：");
      console.log(keyword);
      if (keyword.length != 0) {
        this.back = "";
        //匹配
        this.blogsRst = [];
        let regStr = "";
        for (let i = 0; i < keyword.length; i++) {
          regStr = regStr + "(" + keyword[i] + ")([\\s]*)"; //跨字匹配
        }
        let reg = new RegExp(regStr);
        for (let i = 0; i < this.blogs.length; i++) {
          let text = this.blogs[i].text; //按照名字匹配
          let regMatch = text.match(reg);
          if (null !== regMatch) {
            // 将匹配的数据放入结果列表中
            this.blogsRst.push(this.blogs[i]);
          }
        }
        //清空输入
        this.search_input = "";
        this.loading = false;
        window.removeEventListener("scroll", this.scrollTop);
      } else {
        //再此触发按钮则恢复
        this.blogsRst = this.blogs;
        window.addEventListener("scroll", this.scrollTop);
      }
    },
    //点击返回
    comeback() {
      this.back = "none";
      this.blogsRst = this.blogs;
      window.addEventListener("scroll", this.scrollTop);
    },
    /*
      显示帖子的第一张图片
    */
    show_image(img) {
      return img.split(";")[0];
    },
    /*
      获取首页帖子并渲染
    */
    async show_list() {
      if (this.blogs.length == 0) {
        console.log("执行初始首页加载");
        //显示加载动画
        this.show = true;
        //获取当前时间戳
        let time = parseInt(new Date().getTime() / 1000) + "";
        console.log("当前时间戳:");
        console.log(time);
        //发送时间戳到后端获取数据
        let res = await get_blog_home({
          lastTimeStamp: time,
        });
        console.log("获取到的首页帖子：");
        console.log(res);
        this.blogs = res.data.blog_list;
        this.blogsRst = this.blogs;
        console.log("this.blogs的数据：");
        console.log(this.blogs);
        //传入时间戳到store
        console.log("最下面一个帖子的时间戳:");
        console.log(res.data.lastTimeStamp);
        this.$store.commit("LASTTIMESTAMP", res.data.lastTimeStamp);
        console.log("检查store");
        console.log(this.$store.getters.getLastTimeStamp);
        //结束加载动画
        this.show = false;
      }
    },
    /*
      滚动刷新
    */
    scrollTop() {
      if (timer) {
        clearTimeout(timer);
      }
      //显示加载图标
      this.loading = true;
      timer = setTimeout(() => {
        //获取滚动时的高度
        let st =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        // 浏览器窗口（文档）的可视高度(windowHeight)：（肉眼可见的那部分全屏高度）
        let windowHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        // 文档的真实高度(scrollHeight)：
        let scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        /* 当 windowHeight + st >= scrollHeight  时就表示滚到底了。 */
        if (windowHeight + st >= scrollHeight - 10) {
          //-10校准拉到底了但是windowHeight + st < scrollheight的问题
          clearTimeout(timer); // 触底就直接清除定时器
          timer = null; // 重新让定时器归null
          //获取最后一个帖子的时间戳
          let time = this.$store.getters.getLastTimeStamp - 1;
          console.log("发送的时间戳:");
          console.log(time);
          //发送时间戳到后端获取数据
          get_blog_home({
            lastTimeStamp: time,
          }).then((res) => {
            console.log("加载到的更多的帖子：");
            console.log(res);
            //有数据的时候加载
            if (res.data != null) {
              //将新增的帖子加入到数组中
              let temp = this.blogs.concat(res.data.blog_list);
              this.blogs = temp;
              this.blogsRst = this.blogs;
              console.log("data中的blogs元素：");
              console.log(this.blogs);
              //传入时间戳到store
              console.log("最下面一个帖子的时间戳:");
              console.log(res.data.lastTimeStamp);
              this.$store.commit("LASTTIMESTAMP", res.data.lastTimeStamp);
              console.log("检查store");
              console.log(this.$store.getters.getLastTimeStamp);
              //取消没有更多提醒
              this.noMore = false;
            } else {
              //提示没有更多加载
              this.noMore = true;
              this.loading = false;
              window.removeEventListener("scroll", this.scrollTop);
            }
          });
        }
      }, 200);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollTop);
  },
  created() {
    this.show_list();
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
.back {
  margin-left: 10px;
}
.h_list {
  margin-top: 15px;
}
.h_user {
  font-size: 14px;
  width: 80px;
  min-width: 80px;
  margin: 5px;
  padding: 5px 0px;
}
.h_meta {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0px 12px;
  text-align: left;
}
.h_meta > span {
  color: gray;
}
.h_text {
  margin: 13px;
  text-align: left;
  flex: left;
  width: auto;
  height: 125px;
  word-wrap: break-word;
  font-family: "微软雅黑";
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
.h_content {
  display: flex;
}
.h_item {
  background-color: white;
  margin: 0 auto;
  margin-bottom: 7px;
  width: 800px;
  height: 175px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  overflow: visible;
}
.h_image {
  width: 157px;
  height: 157px;
  min-width: 157px;
  min-height: 157px;
  margin: 10px;
  float: right;
}
.h_img {
  width: 100%;
  height: 100%;
}
.h_block {
  margin: 0 auto;
  min-width: 1080px;
  max-width: 100%;
  overflow: visible;
}
.middle {
  position: absolute;
  top: 50%;
  right: 50%;
  height: 5vh;
  background-color: rgb(212, 27, 27) f;
  box-shadow: 5px 5px 5px rgba(191, 16, 16, 0.1);
}
.cursor-brown {
  cursor: pointer;
  color: brown;
}
.h_error {
  display: none;
  width: 100%;
  height: 155px;
  background-color: #dceeff;
}
.input-with-select {
  width: 650px;
  margin-top: 10px;
  background-color: rgb(212, 212, 212);
}
</style>