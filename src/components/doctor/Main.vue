<template>
  <div>
    <el-page-header @back="goHome" content="门诊病历" title="首页"></el-page-header>
    <el-container>
      <el-aside width="300px">
        <el-card>
          <div slot="header" class="clearfix">
            <span>未诊患者</span>
          </div>
          <el-table
            height="250"
            ref="regTable"
            :data="registered"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column label="病历号" prop="medicalRecordNumber" width="100"></el-table-column>
            <el-table-column label="姓名" prop="name" width="100"></el-table-column>
            <el-table-column label="年龄" prop="year" width="50"></el-table-column>
          </el-table>
        </el-card>
        <br />
        <el-divider></el-divider>
        <el-card>
          <div slot="header" class="clearfix">
            <span>已诊患者</span>
          </div>
          <el-table
            ref="diagTable"
            :data="diagnosed"
            width="100%"
            height="250"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column label="病历号" prop="medicalRecordNumber" width="100"></el-table-column>
            <el-table-column label="姓名" prop="name" width="100"></el-table-column>
            <el-table-column label="年龄" prop="year" width="50"></el-table-column>
          </el-table>
        </el-card>
      </el-aside>
      <el-container>
        <el-header
          style="padding: 0px;display:flex;justify-content:space-between;align-items: center"
        >
          <el-menu
            mode="horizontal"
            background-color="#b3c0d1"
            text-color="#000000"
            active-text-color="#606266"
          >
            <el-menu-item index="1">
              <router-link to="/home/main/consult" tag="span">病历首页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/home/main/Prescribe" tag="span">成药处方</router-link>
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
import { request } from "../../request";
export default {
  data() {
    return {
      doctor: JSON.parse(sessionStorage.getItem("user")),
      registered: [],
      diagnosed: [],
      currentRow: []
    };
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getAllPatient() {
      request({
        url: "/patients",
        method: "get",
        params: {
          doctorId: 1
        }
      }).then(res => {
        this.registered = res.data.registered;
        this.diagnosed = res.data.diagnosed;
      });
    },
    goHome() {
      this.$router.push({
        path: "/home"
      });
    }
  },
  created() {
    this.getAllPatient();
  },
  watch: {
    currentRow: function(newVal, oldVal) {
      // sessionStorage.removeItem("register");
      // sessionStorage.setItem("register", JSON.stringify(newVal));
      this.resetSetItem("register", JSON.stringify(newVal));
    }
  }
};
</script>
<style scoped>
</style>