<template>
  <el-container class="home-container">
    <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
      <span class="home_title">东软云医院</span>
      <el-dropdown class="el-dropdown-link" @command="handleCommand">
        <div class="userface">
          <span slot="title">{{user.name}}</span>&nbsp;
          <i class="el-icon-user"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <el-aside width="250px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          style="height:100%"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>挂号收费</span>
            </template>

            <div :hidden="!authority.register">
              <el-menu-item index="1-1">
                <router-link to="/home/register" tag="span">*挂号</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/home/withdraw" tag="span">*退号</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/home/charge" tag="span">*交费</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link to="**" tag="span">退费</router-link>
              </el-menu-item>
              <el-menu-item index="1-5">
                <router-link to="**" tag="span">发票补打</router-link>
              </el-menu-item>
              <el-menu-item index="1-6">
                <router-link to="**" tag="span">发票重打</router-link>
              </el-menu-item>
              <el-menu-item index="1-7">
                <router-link to="**" tag="span">患者费用查询</router-link>
              </el-menu-item>
            </div>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>门诊医生</span>
            </template>
            <div :hidden="!authority.consult">
              <el-menu-item index="2-1">
                <router-link to="/home/main" tag="p">*门诊病历</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">医技模板管理</el-menu-item>
              <el-menu-item index="3-3">西药处方模板</el-menu-item>
              <el-menu-item index="3-4">中药处方模板</el-menu-item>
            </div>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>药房管理</span>
            </template>
            <div :hidden="!authority.dispense">
              <el-menu-item index="3-1">
                <router-link to="/home/dispense" tag="p">*药房发药</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">药房退药</el-menu-item>
              <el-menu-item index="3-3">药品管理</el-menu-item>
            </div>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <div :hidden="!authority.system">
              <el-menu-item index="4-1">用户管理</el-menu-item>
              <el-menu-item index="4-2">科室管理</el-menu-item>
              <el-menu-item index="4-3">医生排班管理</el-menu-item>
            </div>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { request } from "./request";
export default {
  inject: ["reload"],
  data() {
    return {
      user: { userType: "" },
      authority: {
        register: false,
        consult: false,
        dispense: false,
        system: false
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getAuthority() {
      request({
        url: "/role",
        method: "get",
        params: {
          userType: this.user.userType
        }
      }).then(res => {
        this.authority = res.data;
      });
    },
    handleCommand(cmd) {
      if (cmd == "logout") {
        this.$confirm("注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // this.$router.go(0);
            // this.$router.replace({ path: "/home/register" });
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("online");
            this.$alert("注销成功!", "操作成功", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.replace({ path: "/home/register" });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消"
            });
          });
      }
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
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.getAuthority();
  }
};
</script>
<style>
.home-container {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;
  padding: 0px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 10%;
}
.home_title {
  color: #fff;
  font-size: 22px;
  display: inline;
  margin-left: 8px;
}
.userface {
  float: right;
  font: bold;
  font-size: 18px;
  margin-right: 10px;
}
.user-img {
  width: 30px;
  height: 30px;

  border-radius: 100px;
}
.el-dropdown-link {
  cursor: pointer;
  display: inline;
}
</style>