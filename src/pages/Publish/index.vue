<template>
  <div class="publish">
    <!-- 图片上传 -->
    <div class="upload">
      <p>图片上传：</p>
      <el-upload
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :file-list="fileList"
        list-type="picture-card"
        :multiple="true"
        :auto-upload="false"
        :limit="limit"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>

    <!-- 文本编辑 -->
    <div class="text">
      <mavon-editor v-model="text"></mavon-editor>
    </div>
    <div class="submit">
      <el-button type="primary" @click="publish">发布文章</el-button>
    </div>
  </div>
</template>
<script>
import { post_blog } from "@/api";
export default {
  name: "Publish",
  data() {
    return {
      fileList: [],
      text: "",
      limit:9,
    };
  },
  methods: {
    //选择文件时将文件传入fileList中
    handleChange(file) {
      this.fileList.push(file);
    },
    //发布帖子
    async publish() {
      //文本框为空时返回
      if(this.text == ""){
        this.$message.error("文本框不能为空!")
        return;
      } 
      // FormData对象，既可以传递图片文件，也可以传参数
      let formData = new FormData();
      // //读取到照片图
      console.log("获取到的el-upload资源:");
      console.log(this.fileList);
      //设置图片数据
      let files = this.fileList;
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file.raw); //文件
        });
      } else {
        //如果没有图片则给空
        formData.append("files", "");
      }
      //获取编辑的帖子内容
      let text = this.text;
      //添加文章内容
      formData.append("text", text);
      //检查
      console.log("查看formData:");
      formData.forEach(function (value, key) {
        console.log(key, value);
      });
      //发送给后端接口
      let result = await post_blog(formData);
      console.log("发布文章接口的返回结果:");
      console.log(result);
      //发送成功后提示并跳转回首页
      if (result.code == 0) {
        console.log('发布成功');
        this.$message.success("发布成功！");
        setTimeout(() => {
          this.$router.push("/home/blog_list");
        },3000);//延时3秒，否则后端响应的时间不够
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>
<style scoped>
.publish {
  background-color: white;
  padding: 0 10%;
  float: left;
  width: 100%;
  max-height: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
}
.text {
  padding-top: 12px;
  height: 100%;
  width: 80%;
  clear: left;
}
.upload {
  margin: 10px 0px;
  padding-left: 12px;
}
.upload-demo {
  display: flex;
}
.title {
  width: 100%;
  margin: 10px 0px;
}
p {
  text-align: left;
}
.submit {
  margin: 20px;
  display: flex;
}
</style>
