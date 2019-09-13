<template>
  <div>
    <el-row :gutter="1">
      <el-col :span="2">
        <el-tag>患者信息:</el-tag>
      </el-col>
      <el-col :span="16">
        <el-popover trigger="hover" placement="top">
          <p>病历号: {{ register.medicalRecordNumber }}</p>
          <p>姓名: {{register.name}}</p>
          <p>年龄:{{register.year}}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{register.name}}</el-tag>
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <el-row style="text-align:center" :gutter="10">
      <el-button type="text" icon="el-icon-circle-plus" class="btn-font" @click="openAddPre">增方</el-button>
      <el-button type="text" icon="el-icon-remove" class="btn-font">删方</el-button>
      <el-button type="text" icon="el-icon-success" class="btn-font" @click="openPre">开立</el-button>
      <el-button
        type="text"
        icon="el-icon-circle-plus-outline"
        class="btn-font"
        @click="dialogVisible=true"
      >增药</el-button>
      <el-button type="text" icon="el-icon-remove-outline" class="btn-font">删药</el-button>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card style="height:250px;width:400px">
          <el-tag type="info">门诊处方：</el-tag>
          <el-table
            :data="precribes"
            ref="preTable"
            highlight-current-row
            height="200px"
            @current-change="handleCurrentChange"
          >
            <el-table-column prop="name" label="名称" width="250"></el-table-column>
            <el-table-column label="状态" width="100">
              <p>暂存</p>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-table
          style="width:100%;height:300px"
          ref="detailTable"
          @selection-change="handleSelectionChange"
          :data="preDetails"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="medicineName" label="药品名称"></el-table-column>
          <el-table-column prop="specification" label="规格"></el-table-column>
          <el-table-column prop="medicineUnitPrice" label="单价"></el-table-column>
          <el-table-column prop="useWay" label="用法"></el-table-column>
          <el-table-column prop="cumsumption" label="用量"></el-table-column>
          <el-table-column prop="frequency" label="频次"></el-table-column>
          <el-table-column prop="count" label="数量"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="诊断信息" :visible.sync="dialogVisible" width="30%">
      <template>
        <el-transfer
          v-model="medicines"
          :props="{
      key: 'medicineId',
      label: 'medicineName'
    }"
          :data="details"
        ></el-transfer>
      </template>
      <template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMedicine">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "../../request";
export default {
  data() {
    return {
      register: "",
      precribes: [],
      preDetails: [],
      indexOfPre: "",
      multipleSelection: [],
      currentRow: null,
      dialogVisible: false,
      medicines: [],
      details: []
    };
  },
  methods: {
    toggleSelection() {
      this.$refs.detailTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    setCurrent(row) {
      this.$refs.preTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    openAddPre() {
      this.$prompt("请输入处方名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        var pre = {
          registerId: this.register.registerId,
          name: value,
          details: []
        };
        this.precribes.push(pre);
      });
    },
    addMedicine() {},
    openPre() {
      const pres = this.precribes.filter(item => {
        var newPre = {
          registerId: "",
          name: "",
          details: ""
        };
        newPre.registerId = item.registerId;
        newPre.name = item.name;
        newPre.details = item.details.join(",");

        return newPre;
      });

      request({
        url: "/prescribe",
        method: "post",
        data: pres
      }).then(res => {
        console.log(res.data);
      });
    }
  },
  created() {
    window.addEventListener("setItem", () => {
      this.register = JSON.parse(sessionStorage.getItem("register"));
    });
  },
  watch: {
    currentRow: function(newVal) {
      this.preDetails = newVal.details;
    }
  }
};
</script>
<style scoped>
.btn-font {
  font-size: 18px;
  font: bold;
}
</style>