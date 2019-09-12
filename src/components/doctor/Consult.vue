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
      <el-col :span="6">
        <el-button
          type="primary"
          @click="consult"
          icon="el-icon-top"
          style="float:right"
          size="small"
        >提交</el-button>
      </el-col>
    </el-row>
    <el-tag>病史内容:</el-tag>
    <el-form ref="form" :model="medicalRecord" label-width="80px">
      <el-form-item label="主诉">
        <el-input type="textarea" v-model="medicalRecord.description"></el-input>
      </el-form-item>
      <el-form-item label="现病史">
        <el-input type="textarea" v-model="medicalRecord.currentIllnessHistory"></el-input>
      </el-form-item>
      <el-form-item label="治疗情况">
        <el-input type="textarea" v-model="medicalRecord.currentTreatment"></el-input>
      </el-form-item>
      <el-form-item label="既往史">
        <el-input type="textarea" v-model="medicalRecord.pastHistory"></el-input>
      </el-form-item>
      <el-form-item label="过敏史">
        <el-input type="textarea" v-model="medicalRecord.allergyHistory"></el-input>
      </el-form-item>
      <el-form-item label="体格检查">
        <el-input type="textarea" v-model="medicalRecord.physicalExamination"></el-input>
      </el-form-item>
    </el-form>
    <el-tag>评估/诊断:</el-tag>
    <el-card style="height:300px">
      <div slot="header">
        <span style="font-size:14px">西医诊断</span>
        <el-button style="float: right" type="danger" size="small" icon="el-icon-delete">删除</el-button>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="dialogVisible = true"
          icon="el-icon-plus"
        >添加</el-button>
      </div>
      <el-table
        :data="diagnoses"
        tooltip-effect="dark"
        ref="mulTable"
        @selection-change="handleSelectionChange"
        height="250px"
      >
        <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column prop="diseaseId" label="id" width="300"></el-table-column>
        <el-table-column prop="diseaseName" label="名称" width="500"></el-table-column>
        <el-table-column prop="diseaseDate" label="发病时间"></el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="诊断信息" :visible.sync="dialogVisible" width="20%">
      <el-form>
        <el-form-item label="诊断疾病">
          <el-select v-model="disease">
            <el-option
              v-for="item in diseases"
              :key="item.diseaseId"
              :label="item.diseaseName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发病日期">
          <el-date-picker
            v-model="diagnose.diseaseDate"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
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
      register: "",
      medicalRecord: {
        registerId: "",
        description: "",
        currentIllnessHistory: "",
        currentTreatment: "",
        pastHistory: "",
        allergyHistory: "",
        physicalExamination: "",
        examinationSuggestion: "",
        attention: "",
        examinationResults: "",
        diagnosticResults: "",
        disposalSuggestion: "",
        status: "1"
      },
      diagnoses: [],
      diagnose: {
        medicalRecordNumber: "",
        registerId: "",
        diseaseId: "",
        diseaseName: "",
        diagnosticType: "1",
        diseaseDate: "",
        diagnosticStatus: "1"
      },
      diseases: [],
      dialogVisible: false,
      disease: {}
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
      var tmp = {
        medicalRecordNumber: "",
        registerId: "",
        diseaseId: "",
        diseaseName: "",
        diagnosticType: "1",
        diseaseDate: "",
        diagnosticStatus: "1"
      };
      tmp.medicalRecordNumber = this.register.medicalRecordNumber;
      tmp.registerId = this.register.registerId;
      tmp.diseaseName = this.disease.diseaseName;
      tmp.diseaseId = this.disease.diseaseId;
      tmp.diseaseDate = this.diagnose.diseaseDate;
      this.diagnoses.push(tmp);

      this.dialogVisible = false;

      this.disease = "";
      this.diagnose.diseaseDate = "";
    },
    consult() {
      this.medicalRecord.registerId = this.register.registerId;
      request({
        url: "/consult",
        method: "post",
        data: this.medicalRecord
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
  },
  created() {
    this.getAllDisease();
    window.addEventListener("setItem", () => {
      this.register = JSON.parse(sessionStorage.getItem("register"));
    });
  }
};
</script>
<style scoped>
</style>