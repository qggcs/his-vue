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
        @click="openAddMed"
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
          height="300px"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="medicineName" label="药品名称"></el-table-column>
          <el-table-column prop="specification" label="规格"></el-table-column>
          <el-table-column prop="medicineUnitPrice" label="单价"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="manufactor" label="制造商"></el-table-column>
          <el-table-column prop="frequency" label="频次">
            <p>一天两次</p>
          </el-table-column>
          <el-table-column label="数量">
            <p>1</p>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-tabs type="card" class="tabs" v-model="activeName">
        <el-tab-pane label="处方模板" name="first">
          <el-row>
            <el-col :span="10">
              <el-card style="height:400px;width:500px">
                <div slot="header">
                  关键字:
                  <el-input v-model="key" placeholder="请输入查询关键字" style="width:380px"></el-input>
                </div>
                <el-table
                  :data="tmp"
                  ref="tmpTable"
                  highlight-current-row
                  height="300px"
                  @current-change="getTemplate"
                >
                  <el-table-column prop="name" label="模板名称"></el-table-column>
                  <el-table-column prop="scope" label="范围"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card style="height:350px;width:750px">
                <div slot="header">
                  <span>模板明细</span>
                  <el-button
                    style="float: right; padding: 15px 3px"
                    type="text"
                    @click="addPreByTmp"
                  >使用该模板</el-button>
                </div>
                <el-table :data="tmpDetails" ref="tmpDetailTable" height="300px">
                  <el-table-column prop="medicineName" label="药品名称"></el-table-column>
                  <el-table-column prop="specification" label="规格"></el-table-column>
                  <el-table-column prop="unit" label="单位"></el-table-column>
                  <el-table-column prop="useWay" label="用法"></el-table-column>
                  <el-table-column prop="comsumption" label="用量"></el-table-column>
                  <el-table-column prop="frequency" label="频次"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="常用药品" name="second">
          <center>常用药品</center>
        </el-tab-pane>
        <el-tab-pane label="建议方案" name="third">
          <center>建议方案</center>
        </el-tab-pane>
        <el-tab-pane label="历史处方" name="fourth">
          <center>历史处方</center>
        </el-tab-pane>
      </el-tabs>
    </el-row>

    <el-dialog title="添加药品" :visible.sync="dialogVisible" width="30%">
      <template>
        <el-select
          v-model="details"
          multiple
          value-key="medicineId"
          filterable
          placeholder="输入药品名称进行搜索"
        >
          <el-option
            v-for="item in medicines"
            :key="item.medicineId"
            :label="item.medicineName"
            :value="item"
          ></el-option>
        </el-select>
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
  inject: ["reload"],
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
      details: [],
      key: "",
      activeName: "first",
      templates: [],
      template: {},
      tmp: [],
      tmpDetails: []
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
    addMedicine() {
      this.currentRow.details = this.currentRow.details.concat(this.details);
      this.preDetails = this.currentRow.details;
      this.details = [];
      this.dialogVisible = false;
    },
    openPre() {
      const pres = [];
      this.precribes.forEach(item => {
        var newPre = {
          registerId: "",
          name: "",
          details: []
        };
        newPre.registerId = item.registerId;
        newPre.name = item.name;
        newPre.details = this.convertor(item.details).join(",");
        console.log(newPre.details);

        pres.push(newPre);
      });

      request({
        url: "/prescribe",
        method: "post",
        data: pres
      }).then(res => {
        this.reload();
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
    },
    convertor(tmp) {
      var details = [];
      tmp.forEach(item => {
        details.push(item.medicineId);
      });

      return details;
    },
    getAllMedicines() {
      request({
        url: "/medicines",
        method: "post"
      }).then(res => {
        this.medicines = res.data;
      });
    },
    openAddMed() {
      if (this.currentRow == null) {
        this.$message.error("请选择处方后再操作!");
        return;
      }
      this.dialogVisible = true;
    },
    getTemplate(val) {
      this.template = val;
    },
    getAllTemplates() {
      request({
        url: "/tmps",
        method: "get"
      }).then(res => {
        this.templates = res.data;
        this.tmp = JSON.parse(JSON.stringify(res.data));
      });
    },
    addPreByTmp() {
      var preByTmp = {
        registerId: this.register.registerId,
        name: this.template.name,
        details: this.tmpDetails
      };

      this.precribes.push(preByTmp);
    }
  },
  created() {
    this.getAllMedicines();
    this.getAllTemplates();
    window.addEventListener("setItem", () => {
      this.register = JSON.parse(sessionStorage.getItem("register"));
    });
  },
  watch: {
    currentRow: function(newVal) {
      this.preDetails = newVal.details;
    },
    template: function(newVal) {
      request({
        url: "/detail",
        method: "get",
        params: {
          templateId: newVal.templateId
        }
      }).then(res => {
        this.tmpDetails = res.data;
      });
    },
    key: function(newVal) {
      if (newVal === "") {
        this.tmp = JSON.parse(JSON.stringify(this.templates));
      } else {
        this.tmp = this.templates.filter(item => {
          if (item.name.includes(newVal)) {
            return item;
          }
        });
      }
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