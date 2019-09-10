<template>
  <el-container class="home-container">
    <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
      <span>东软云医院</span>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>挂号收费</span>
            </template>
            <el-menu-item index="1-1">
              <router-link to="/home/register" tag="p">挂号</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/home/withdraw" tag="p">退号</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link to="/home/charge" tag="p">交费</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>门诊医生</span>
            </template>
            <el-menu-item index="2-1">
              <router-link to="/home/medicalRecord" tag="p">门诊病历</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>药房管理</span>
            </template>
            <el-menu-item index="3-1">
              <router-link to="/home/dispense" tag="p">发药</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="4-1"></el-menu-item>
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
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
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
</style>