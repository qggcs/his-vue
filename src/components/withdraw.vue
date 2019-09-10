<template>
  <div>
    <el-row>
      <h3>患者信息查询</h3>
    </el-row>
    <el-row>
      <el-col>
        病历号:
        <el-input style="width:150px" v-model="medicalRecordNumber" placeholder="请输入病历号"></el-input>
        <el-button type="primary" @click="getAllInfo">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <h3>患者信息确认</h3>
    </el-row>
    <el-row>
      <el-col :span="6">
        姓名:
        <el-input style="width:150px" v-model="name" placeholder="姓名"></el-input>
      </el-col>
      <el-col :span="8">
        身份证号:
        <el-input style="width:250px" v-model="id" placeholder="身份证号"></el-input>
      </el-col>
      <el-col :span="10">
        家庭住址:
        <el-input style="width:300px" v-model="address" placeholder="家庭地址"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <h3>患者挂号信息</h3>
    </el-row>
    <el-row>
      <el-table style="width:100%" :data="infos">
        <el-table-column prop="medicalRecordNumber" label="病历号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="id" label="身份证号" width="250"></el-table-column>
        <el-table-column prop="registerDate" label="挂号日期" width="180"></el-table-column>
        <el-table-column prop="period" label="挂号午别" width="180"></el-table-column>
        <el-table-column prop="department" label="科室" width="180">{{department.name}}</el-table-column>
        <el-table-column prop="status" label="看诊状态" width="180"></el-table-column>
        <el-table-column prop="status" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="withdraw(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { request } from "../request";
export default {
  data() {
    return {
      medicalRecordNumber: "",
      name: "",
      id: "",
      address: "",
      infos: [],
      department: {}
    };
  },
  methods: {
    getAllInfo() {
      request({
        url: "/infos",
        method: "get",
        params: {
          medicalRecordNumber: this.medicalRecordNumber
        }
      }).then(res => {
        console.log(res.data);
        this.infos = res.data.infos;
        this.department = res.data.department;
      });
    },
    withdraw(row) {
      console.log(row.registerId);
      request({
        url: "/withdraw",
        method: "get",
        params: {
          registerId: row.registerId
        }
      }).then(res => {
        this.msgOpen(res.data.status, res.data.msg);
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
div {
  line-height: 50px;
}
</style>