<template>
  <div class="bg">
    <div class="block">
      <ul class="list">
        <!-- <li
          @click="articleDetail(blog.id)"
          v-for="blog in blog_list"
          :key="blog.id"
          class="item"
        > -->
        <li class="item" @click="articleDetail()">
          <div class="user">
            <div>
              <el-avatar :src="head_url" class="h-icon"></el-avatar>
            </div>
            <div>
              <span>nickname</span>
            </div>
          </div>
          <div>
            <div class="text">
              <span>
                这部分是动态内容，将展示部分正文内容，多余的部分将会在末尾显示...
                整个动态卡片（白色部分）都可以点击跳转到正文内容
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
              </span>
            </div>
            <div class="meta">
              <!-- <span>评论 {{ blog.comment_num }}</span>
            <span>赞 {{ blog.like }}</span> -->
              <span>评论 10</span>
              &nbsp;&nbsp;&nbsp;
              <span>赞 200</span>
            </div>
          </div>
          <el-image
            style="width: 157px; height: 157px; margin: 10px; flex: right"
            :src="url"
            :fit="fit"
          ></el-image>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog_List",
  data() {
    return {
      fit: "",
      head_url: "",
      img_url: "",
      blog_list: [
        {
          id: 1,
          user_id: 1,
          user_name: "xxx",
          user_avatar: "img_url",
          content: "xxxxxxxxxxxxxx",
          imgs: [],
          like: 100,
          comment_num: 10,
        },
      ],
      lastTimeStamp: xxx,
    };
  },
  methods: {
    articleDetail() {
      console.log("test");
    },
    page() {
      this.$axios
        .get("https://124.222.25.150:9090/blog/space/list?UserID=1")
        .then((res) => {
          console.log(res.data);
          this.user_id = res.data.user_id;
          this.user_name = res.data.user_name;
          this.user_avatar = res.data.user_avatar;
          this.text = res.data.text;
          this.imgs = res.data.imgs;
          this.like = res.data.like;
          this.hide = res.data.hide;
        });
    },
  },
  //   created() {
  //     this.page();
  //   },
};
</script>

<style scoped>
.user {
  font-size: 14px;
  width: 60px;
  margin: 5px;
  padding: 5px 0px;
}
.meta {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0px 12px;
  text-align: left;
}
.meta > span {
  color: gray;
}
.text {
  margin: 15px;
  text-align: left;
  flex: left;
  width: 500px;
  height: 120px;
  word-wrap: break-word;
  font-family: "微软雅黑";
}
.item {
  background-color: white;
  margin: 0 auto;
  margin-bottom: 7px;
  width: 800px;
  height: 175px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
}
.block {
  margin: 10px 10%;
  min-width: 1080px;
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
</style>