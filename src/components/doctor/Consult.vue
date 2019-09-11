<template>
  <div>
    <el-tag>病史内容:</el-tag>
    <el-form ref="form" :model="medicalRecord" label-width="80px">
      <el-form-item label="主诉" v-model="medicalRecord.description">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="现病史" v-model="medicalRecord.currentIllnessHistory">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="治疗情况" v-model="medicalRecord.currentTreatment">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="既往史" v-model="medicalRecord.pastHistory">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="过敏史" v-model="medicalRecord.allergyHistory">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="体格检查" v-model="medicalRecord.physicalExamination">
        <el-input type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <el-tag>评估/诊断:</el-tag>
    <el-card style="height:300px">
      <div slot="header">
        <span style="font-size:14px">西医诊断</span>
        <el-button style="float: right" type="danger" size="small">删除</el-button>
        <el-button style="float: right" type="primary" size="small" @click="dialogVisible = true">添加</el-button>
      </div>
      <el-table
        :data="diagnoses"
        tooltip-effect="dark"
        ref="mulTable"
        @selection-change="handleSelectionChange"
        height="250px"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="icdCode" width="110"></el-table-column>
        <el-table-column prop="diseaseName" width="500"></el-table-column>
        <el-table-column prop="diseaseDate" width="110"></el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="诊断信息" :visible.sync="dialogVisible" width="20%">
      <el-form>
        <el-form-item label="诊断疾病">
          <el-select v-model="diagnose.diseaseId">
            <el-option
              v-for="item in diseases"
              :key="item.diseaseId"
              :label="item.diseaseName"
              :value="item.diseaseId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发病日期">
          <el-date-picker v-model="diagnose.diseaseDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiagnose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "../../request";
export default {
  data() {
    return {
      register: JSON.parse(sessionStorage.getItem("register")),
      medicalRecord: {
        description: "",
        currentIllnessHistory: "",
        currentTreatment: "",
        pastHistory: "",
        allergyHistory: "",
        physicalExamination: ""
      },
      diagnoses: [],
      diagnose: {
        medicalRecordNumber: "",
        registerId: "",
        diseaseId: "",
        diagnosticType: "1",
        diseaseDate: "",
        diagnosticStatus: "1"
      },
      diseases: [],
      dialogVisible: false
    };
  },
  methods: {
    toggleSelection() {
      this.$refs.mulTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getAllDisease() {
      request({
        url: "/diseases",
        method: "get"
      }).then(res => {
        this.diseases = res.data.diseases;
      });
    },
    addDiagnose() {
      this.diagnose.medicalRecordNumber = this.register.medicalRecordNumber;
      this.diagnose.registerId = this.register.registerId;
      dialogVisible = false;
    }
  },
  created() {
    this.getAllDisease();
  }
};
</script>
<style scoped>
</style>