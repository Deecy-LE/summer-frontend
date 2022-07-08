<template>
    
  <div class="module">
    <div class="container">
      <div class="form-box">
        <!-- 注册页面滑动框 -->
        <keep-alive>
          <div class="register-box hidden">
            <h1>REGISTER</h1>
            <input type="text" placeholder="用户名" v-model="reg_id" />
            <input type="password" placeholder="密码" v-model="reg_pwd" @keydown.13="post_register" />
            <input type="text" placeholder="验证码" v-model="va_code" />
            <button @click.prevent="post_register">注册</button>
          </div>
        </keep-alive>
        <!-- 登录页面滑动框 -->
        <keep-alive>
          <div class="login-box">
            <h1>LOGIN</h1>
            <input type="text" placeholder="用户名" v-model="log_id" />
            <input type="password" placeholder="密码" v-model="log_pwd" @keydown.13="post_login" />
            <span class="error-info" v-show="has_error">{{this.error_msg}}</span>
            <button @click.prevent="post_login">登录</button>
          </div>
        </keep-alive>
      </div>
      <!-- 注册页面 -->
      <div class="con-box left">
        <h2><span>注册界面</span></h2>
        <img src="./img/logo_shu.png" alt="" zoom="66%" />
        <p>已有账号？</p>
        <button @click="toLogin">登录</button>
      </div>
      <!-- 登录页面 -->
      <div class="con-box right">
        <h2><span>登录界面</span></h2>
        <img src="./img/logo_shu.png" alt="" />
        <p>没有账号？</p>
        <button @click="toRegister">注册</button>
      </div>
    </div>
  </div>

</template>


<script>
import  cryptoJSObj  from  '@/utils/crypto.js'
import {
    get_space,
} from "@/api";
export default {
  data() {
    return {
      hide : true,
      log_id: "",
      log_pwd: "",
      reg_id: "",
      reg_pwd: "",
      va_code: "",
      has_error:false,
      error_msg:"",
    };
  },
  methods: {
    //访问space按钮的函数
    async visit_space(){
       let result = await get_space()
       if (result.code == 1) {  //已登录成功
          let toPath = "/space/"+result.uid;
          this.$router.push(toPath);
          console.log(result.msg);
        }
        else{ //未登录
          let toPath = "/login"
          this.$router.push(toPath);
          alert(result.msg)
        }
    },
    //换成登录页面切换
    toLogin() {
      var login_box = document.getElementsByClassName("login-box")[0];
      var form_box = document.getElementsByClassName("form-box")[0];
      var register_box = document.getElementsByClassName("register-box")[0];
      form_box.style.transform = "translateX(0%)";
      register_box.classList.add("hidden");
      login_box.classList.remove("hidden");
    },
    toRegister() {
      var login_box = document.getElementsByClassName("login-box")[0];
      var form_box = document.getElementsByClassName("form-box")[0];
      var register_box = document.getElementsByClassName("register-box")[0];
      form_box.style.transform = "translateX(80%)";
      login_box.classList.add("hidden");
      register_box.classList.remove("hidden");
    },
    //登录的回调函数
    async post_login() {
        const { log_id, log_pwd } = this;
        log_id && log_pwd;
        let crypto_pwd=cryptoJSObj.encryptFunc(log_pwd) //加密
        let result = await this.$store.dispatch("post_login", {
          usr: log_id,
          pwd: crypto_pwd,
        });
        if (result.code == 1) {  //登录成功
          let toPath = "/home/"+result.uid;
          this.$router.push(toPath);
          console.log(result.msg);
        }
        else { //登录失败，打印失败信息到屏幕
          this.has_error=true
          this.error_msg=result.msg
        }
    },
    async post_register() {

    },
  },
  async mounted() {
    //自动登录
       let result = await get_space()
       if (result.code == 1) {  //已登录成功
          let toPath = "/space";
          this.$router.push(toPath);
          console.log(result.msg);
        }
        else{ //未登录
          let toPath = "/login"
          this.$router.push(toPath);
        }
  },
};
</script>


<style >
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
/* scoped:局部样式 */
.module {
  margin: 0;
  padding: 0;
  /* 100%窗口高度 */
  height: 100vh;
  /* 弹性布局 水平+垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background: linear-gradient(200deg, #e7eff3, #e3eeff);
}

.container {
  background-color: #fff;
  width: 650px;
  height: 415px;
  border-radius: 5px;
  /* 阴影 */
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  /* 相对定位 */
  position: relative;
}

.rtop {
  position: absolute;
  top: 5%;
  right: 10%;
  height: 5vh;
  background-color: rgb(212, 27, 27) f;
  box-shadow: 5px 5px 5px rgba(191, 16, 16, 0.1);
}
.error-info{
  color: red;
}
.form-box {
  /* 绝对定位 */
  position: absolute;
  top: -10%;
  left: 5%;
  background-color: #b7bcd8;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}

.register-box,
.login-box {
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.hidden {
  display: none;
  transition: 0.5s;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  /* 大写 */
  text-transform: uppercase;
  color: #fff;
  /* 字间距 */
  letter-spacing: 5px;
}

input {
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  /* 下边框样式 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}

input::placeholder {
  color: #fff;
}

input:focus {
  color: #a262ad;
  outline: none;
  border-bottom: 1px solid #a262ad80;
  transition: 0.5s;
}

input:focus::placeholder {
  opacity: 0;
}

.form-box button {
  width: 70%;
  margin-top: 35px;
  background-color: #f6f6f6;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #a262ad;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}

.form-box button:hover {
  background-color: #a262ad;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}

.con-box {
  width: 50%;
  /* 弹性布局 垂直排列 居中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 绝对定位 居中 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.con-box.left {
  left: -2%;
}

.con-box.right {
  right: -2%;
}

.con-box h2 {
  color: #8e9aaf;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}

.con-box p {
  font-size: 12px;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}

.con-box span {
  color: #d3b7d8;
}

.con-box img {
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
}

.con-box button {
  margin-top: 3%;
  background-color: #fff;
  color: #a262ad;
  border: 1px solid #d3b7d8;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}

.con-box button:hover {
  background-color: #d3b7d8;
  color: #fff;
}
</style>
