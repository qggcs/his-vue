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
      <el-button type="text" icon="el-icon-success" class="btn-font">开立</el-button>
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

    <el-dialog title="增加处方" :visible.sync="dialogVisible" width="35%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPre">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: "",
      precribes: [],
      preDetails: [],
      indexOfPre: "",
      multipleSelection: [],
      currentRow: null
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
          medicalRecordNumber: this.register.medicalRecordNumber,
          registerId: this.register.registerId,
          doctorId: this.register.doctorId,
          name: value,
          details: []
        };
        this.precribes.push(pre);
      });
    },
  },
  created() {
    window.addEventListener("setItem", () => {
      this.register = JSON.parse(sessionStorage.getItem("register"));
    });
  }
};
</script>
<style scoped>
.btn-font {
  font-size: 18px;
  font: bold;
}
</style>