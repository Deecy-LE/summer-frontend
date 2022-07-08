<template>
  <div class="publish">
    <!-- 图片上传 -->
    <div class="upload">
      <p>图片上传：</p>
      <el-upload
        class="upload-demo"
        action="https://124.222.25.150/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="imgs"
        list-type="picture-card"
        :multiple="true"
        :auto-upload="false"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <!-- 文本编辑 -->
    <div class="text">
      <mavon-editor v-model="text"></mavon-editor>
    </div>
    <div class="submit">
        <el-button type="primary">发布文章</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      imgs: [],
      text: ""
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.dialog;
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
  position:relative;
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
.upload-demo{
  display: flex;
}
.title {
  width: 100%;
  margin: 10px 0px
  ;
}
p {
  text-align: left;
}
.submit{
    margin: 20px;
    display: flex;
}
</style>
