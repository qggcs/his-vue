<template>
  <el-form class="login-container" label-position="left" label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { request } from "./request";

export default {
  data() {
    return {
      userName: "root",
      password: "root",
      checked: true,
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      request({
        url: "/login",
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      }).then(res => {
        var data = res.data;
        this.loading = false;
        if (data.status == 500) {
          this.msgOpen(500, data.msg);
        } else {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("online");
          sessionStorage.setItem("user", JSON.stringify(data.obj));
          sessionStorage.setItem("online", true);
          this.msgOpen(200, data.msg);
          this.$router.push({
            path: "/home"
          });
        }
      });
    },
    msgOpen(status, msg) {
      if (status == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: "success"
        });
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: "error"
        });
      }
    }
  }
};
</script>
<style scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>