<template>
  <div>
    <el-row>
      <h3>药品信息查询</h3>
    </el-row>
    <el-row>
      <el-col :span="6">
        病历号:
        <el-input style="width:150px" v-model="medicalRecordNumber" placeholder="输入病历号"></el-input>
      </el-col>
      <el-col :span="6">
        时间:
        <el-date-picker
          v-model="time"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </el-col>
    </el-row>
    <br />
    <br />
    <br />
    <el-button type="primary" icon="el-icon-success">发药</el-button>
    <el-divider></el-divider>
    <el-table
      style="width:100%"
      :data="medicines"
      tooltip-effect="dark"
      ref="mulTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="medicineName" label="药品名称" width="800"></el-table-column>
      <el-table-column prop="unitPrice" label="单价" width="120"></el-table-column>
      <el-table-column prop="count" label="数量" width="120"></el-table-column>
      <el-table-column prop="status" label="药品状态" width="120"></el-table-column>
      <el-table-column label="开立医生" width="120">
        <p>{{doctor.name}}</p>
      </el-table-column>
      <el-table-column label="处方名称"></el-table-column>
      <el-table-column label="开立时间">
        <p>{{time}}</p>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { request } from "../request";
export default {
  data() {
    return {
      medicalRecordNumber: "",
      time: "",
      medicines: [],
      doctor: {},
      openDate: "",
      multipleSelection: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    search() {
      request({
        url: "/medicines",
        method: "get",
        params: {
          medicalRecordNumber: this.medicalRecordNumber,
          time: this.time
        }
      }).then(res => {
        this.doctor = res.data.doctor;
        this.medicines = res.data.medicines;
      });
    },
    toggleSelection() {
      this.$refs.mulTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style scoped>
div {
  line-height: 50px;
}
</style>