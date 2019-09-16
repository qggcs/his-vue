<template>
  <div class="default">
    <el-page-header @back="goHome" content="404 Not Found" title="首页"></el-page-header>

    <div>
      <center>
        <h1>该功能尚未开发o(*￣▽￣*)ブ</h1>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/home"
      });
    }
  }
};
</script>
<style scoped>
.default {
  background-color: #e9eef3;
  height: 920px;
}
</style>