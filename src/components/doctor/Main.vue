<template>
  <div>
    <el-container>
      <el-aside width="300px"></el-aside>
      <el-container>
        <el-header
          style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
        >
          <el-menu
            mode="horizontal"
            @select="handleSelect"
            background-color="#b3c0d1"
            text-color="#000000"
            active-text-color="#606266"
          >
            <el-menu-item index="1">
              <router-link to="/home/main/consult" tag="span">
              病历首页
              </router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/home/main/Prescribe" tag="span">
                成药处方
              </router-link>
            </el-menu-item>
            <el-menu-item index="3">草药处方</el-menu-item>
            <el-menu-item index="4">费用查询</el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>