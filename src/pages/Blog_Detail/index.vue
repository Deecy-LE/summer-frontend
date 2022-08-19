<template>
  <div class="detail">
    <!-- 帖子详情 -->
    <div class="d_blog">
      <div class="d_user">
        <div>
          <el-avatar
            :size="50"
            :src="blog.user_avatar"
            class="h-icon"
          ></el-avatar>
        </div>
        <div>
          <span>{{ blog.user_name }}</span>
        </div>
      </div>
      <div class="d_text">
        <span>
          {{ blog.text }}
        </span>
      </div>
      <div class="d_image">
        <div v-for="img in images" :key="img">
          <el-image
            style="width: 157px; height: 157px; margin: 10px; flex: right"
            :src="img"
            fit="cover"
            alt="el-icon-picture"
            :preview-src-list="images"
            v-if="img"
          >
          </el-image>
        </div>
      </div>
      <div class="d_meta">
        <el-link :underline="false" @click="like" id="like"
          >点赞：{{ blog.like }}</el-link
        >
        &emsp;
        <span>评论数：{{ comment_num }}</span>
      </div>
    </div>
    <!-- 评论发送 -->
    <div class="publish_comment">
      <el-input
        type="textarea"
        placeholder="来参与评论吧"
        v-model="public_comment"
        class="input-with-select"
      >
      </el-input>
      <el-button @click="Comment()" type="primary" plain>发表评论</el-button>
    </div>
    <!-- 评论区 -->
    <div class="comment_area">
      <div v-if="isComment">
        <div class="evry_comment" v-for="comment in comments" :key="comment.id">
          <div class="d_user">
            <div>
              <el-avatar :size="50" :src="comment.user_avatar"></el-avatar>
            </div>
            <div>
              <span>{{ comment.user_name }}</span>
            </div>
          </div>
          <div class="user_comment">{{ comment.text }}</div>
          <div class="comment_time">{{ time(comment.create_time_stamp) }}</div>
        </div>
      </div>
      <div v-if="noMore" style="padding: 10px; background-color: white">
        还没有人评论噢...
      </div>
    </div>
  </div>
</template>

<script>
import {
  get_blog_detail,
  post_comment,
  get_comment,
  post_like,
  post_islike,
} from "@/api";
import { parseTime } from "@/utils/date";

export default {
  name: "blog_detail",
  data() {
    return {
      blog: {
        user_id: "",
        user_name: "",
        user_avatar: "",
        text: "",
        like: "",
      },
      liked: false,
      comments: [],
      comment_id: 0,
      comment_num: "0",
      blog_id: "",
      //单独处理图片
      images: [],
      size: "large",
      img: "",
      show: false,
      noMore: false,
      loading: false,
      public_comment: "",
      isComment: false,
      noMore: true,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
     * 点赞
     */
    async like() {
      let id = Number(this.blog_id);
      console.log("点赞操作的博客id:" + id);
      let res = await post_like({
        blog_id: id,
      });
      if (res.data.ok) {
        if (!this.liked) {
          console.log("点赞成功");
          this.blog.like++;
          this.liked = true;
          //变色
          document.getElementById("like").style.color = "rgb(238, 170, 170)";
        } else {
          console.log("取消点赞成功");
          this.blog.like--;
          this.liked = false;
          //还原色
          document.getElementById("like").style.color = "#000";
        }
      }
    },
    /**
     * 发表评论
     */
    async Comment() {
      let id = Number(this.blog_id);
      console.log({
        blog_id: id,
        text: this.public_comment,
      });
      let res = await post_comment({
        blog_id: id,
        text: this.public_comment,
      });
      console.log("发表评论后的响应：");
      console.log(res);
      if (res.data.ok) {
        this.$message.success("评论发表成功！");
        setTimeout(() => {
          this.$router.go(0);
        }, 3000); //延时3秒
      }
    },
  },
  created() {
    let blog_id = this.$route.params.blog_id;
    this.blog_id = blog_id;
    //获取博客详情
    get_blog_detail(blog_id).then((res) => {
      console.log("获取到的帖子详细内容：");
      console.log(res);
      const blog = res.data;
      this.blog.user_id = blog.user_id;
      this.blog.user_name = blog.user_name;
      this.blog.user_avatar = blog.user_avatar;
      this.blog.text = blog.text;
      this.blog.like = blog.like;
      // 对图片单独处理
      this.images = blog.imgs.split(";");
    });
    //获取评论
    get_comment(blog_id).then((res) => {
      console.log("获取到的评论：");
      console.log(res);
      if (res.data.length > 0) {
        this.comments = res.data;
        this.comment_num = res.data.length;
        //设置状态
        this.isComment = true;
        this.noMore = false;
      } else {
        this.isComment = false;
        this.noMore = true;
      }
    });
    //查看是否点赞该博客
    let id = Number(this.blog_id);
    post_islike({
      blog_id: id,
    }).then((res) => {
      console.log("是否点赞该博客：");
      console.log(res.data.liked);
      if (res.data.liked) {
        //变粉
        document.getElementById("like").style.color = "rgb(238, 170, 170)";
        this.liked = true;
      }
    });
  },
};
</script>

<style>
.comment_time{
  text-align: left;
  padding: 10px 80px;
  font-size: small;
}
.evry_comment {
  background-color: white;
  margin: 10px 0;
}
.user_comment {
  text-align: left;
  padding-top: 5px;
  padding-left: 80px;
  padding-right: 25px;
  padding-bottom: 20px;
}
.d_user {
  display: flex;
  padding-top: 15px;
  padding-left: 15px;
}
.d_user div {
  margin: 0px 5px;
}
.d_text {
  margin: 10px 0;
  padding-left: 80px;
  padding-right: 40px;
  text-align: left;
}
.d_error {
  background-color: rgb(234, 255, 254);
  display: none;
}
.d_image {
  display: flex;
  flex-direction: row;
  padding-left: 70px;
  padding-right: 23px;
  padding-top: 25px;
  flex-wrap: wrap;
}
.d_meta {
  text-align: left;
  padding: 10px 80px;
  font-weight: 500;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.detail {
  width: 800px;
  max-height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-content: center;
}
.d_blog {
  margin: 10px 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
}
.publish_comment {
  margin: 10px 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
}
.publish_comment input {
  height: 100px;
}
.comment_area {
  margin: 10px 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-textarea__inner {
  resize: none;
}
</style>