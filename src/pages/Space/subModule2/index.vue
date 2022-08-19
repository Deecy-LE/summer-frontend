<template>
  <div style="height: 15%;padding-top: 20px;">
    <div align="center">
      <div style="height: 15%;padding-top: 20px;">
        <h1 style="height: 10%">用 户 详 情</h1>
      </div>
      <!-- 展示用户信息  -->
      <div>
        <table>
          <tr>
            <th>头像</th>
            <th>序号</th>
            <th>
              <button @click="changename()">名称</button>
            </th>
            <th>邮箱</th>
            <th>
              <button @click="changesex()">性别</button>
            </th>
            <th>操作</th>
          </tr>
          <tr>
            <td>
              <el-col :span="12">
                <div class="demo-basic--circle">
                  <div class="block"><el-avatar :size="100" :src="Imageroad()"></el-avatar></div>
                </div>
              </el-col>
            </td>
            <td> {{ id() }}</td>
            <td>{{user_name()}}</td>
            <td>{{email()}}</td>
            <td>{{sex()}}</td>

            <td>

              <div class="upload">
                <p>图片上传：</p>
                <el-upload
                    class="upload-demo"
                    action=""
                    :on-change="handleChange"
                    :file-list="fileList"
                    list-type="picture-card"
                    :multiple="false"
                    :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
              <button type="button" @click="edit">确认修改</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { get_user_info, modify_user_message} from "@/api";



export default {
  data() {
    return {
      fileList: [],
      hide: false
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    id() {
      return JSON.parse(window.localStorage.getItem('USERID'))
    },
    user_name() {
      const INFO = window.localStorage.getItem('USERINFO')
      const name = INFO.substring(INFO.indexOf('user_name') + 12, INFO.indexOf(',') - 1);
      return name
    },
    email() {
      const INFO = window.localStorage.getItem('USERINFO')
      const Email = INFO.substring(INFO.indexOf('user_email') + 13, INFO.indexOf('user_avatar') - 3);
      return Email
    },
    sex() {
      const INFO = window.localStorage.getItem('USERINFO')
      const sex = INFO.substring(INFO.indexOf('user_gender') + 14, INFO.indexOf('user_email') - 3);
      return sex
    },
    Imageroad() {
      const INFO = window.localStorage.getItem('USERINFO')
      const road = INFO.slice(INFO.indexOf('user_avatar') + 14, -2);
      return road
    },
    async changename() {
      var Name = prompt("请输入修改后的名字", "");

      if (Name == null || Name == "") {
        alert("名称不得为空！");
      } else if (Name.length > 12) {
        alert("名称过长")
      } else {
        let formData = new FormData()
        formData.append("user_name", Name); //文件
        let res = await modify_user_message(formData)
        setTimeout(3000)
        let ABC = await get_user_info()
        console.log(ABC.data);
        localStorage.setItem('USERINFO', JSON.stringify(ABC.data));
        location.reload()


        if (res.code == 0)
          alert("修改成功")
        else {
          alert(res.message)
        }
      }
    },
    handleChange(file) {
      this.fileList.push(file);
    },
    async edit()
    {

      let formData = new FormData();
      // //读取到照片图
      console.log("获取到的el-upload资源:");
      console.log(this.fileList);
      //设置图片数据
      let files = this.fileList;
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("user_avatar", file.raw); //文件
        });
        let res = await modify_user_message(formData)
        setTimeout(8000)
        if (res.code==0)
        {alert("修改成功")
          let ABC = await get_user_info()
          console.log(ABC.data);
          localStorage.setItem('USERINFO', JSON.stringify(ABC.data));
          location.reload()
        }

      } else {
        alert("未选择图片")
      }
    },


    async changesex() {
      var Sex = prompt("您的性别是？(填写男或女)", "");

      if (Sex != "男" && Sex != "女") {
        alert("性别输入有误!");
      }
      else {
        let formData = new FormData()
        formData.append("user_gender", Sex);
        let res = await modify_user_message(formData)
        setTimeout(3000)
        let ABC = await get_user_info()
        console.log(ABC.data);
        localStorage.setItem('USERINFO', JSON.stringify(ABC.data));
        location.reload()


        if (res.code == 0)
          alert("修改成功")
        else {
          alert(res.message)
        }
      }
    },
  }
}
</script>

<style scoped>

</style>

