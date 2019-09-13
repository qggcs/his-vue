<template>
  <div>
    <el-row :gutter="10" type="flex">
      <el-col>
        发票号:
        <el-input style="width:150px" :disabled="true" v-model="invoiceNumber"></el-input>
        <el-button type="primary" @click="addRegister" icon="el-icon-check">挂号</el-button>
        <el-button type="primary" icon="el-icon-refresh-left" @click="refresh">清空</el-button>
      </el-col>
    </el-row>
    <el-row>挂号信息</el-row>
    <el-row>
      <el-col :span="6">
        病历号:
        <el-input placeholder="请输入病历号" style="width:100px" v-model="register.medicalRecordNumber"></el-input>
      </el-col>
      <el-col :span="6">
        姓名:
        <el-input placeholder="请输入姓名" style="width:100px" v-model="register.name"></el-input>
      </el-col>
      <el-col :span="6">
        性别:
        <el-select v-model="register.sex">
          <el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        年龄:
        <el-input placeholder="请输入年龄" style="width:100px" v-model="register.year"></el-input>

        <el-select v-model="register.yearType" style="width:100px">
          <el-option v-for="item in yearTypes" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        出生日期:
        <el-date-picker v-model="register.birthday" type="date" placeholder="选择出生日期"></el-date-picker>
      </el-col>
      <el-col :span="10">
        身份证号:
        <el-input placeholder="请输入身份证号" style="width:350px" v-model="register.id"></el-input>
      </el-col>
      <el-col :span="8">
        家庭住址:
        <el-input placeholder="请输入家庭住址" style="width:350px" v-model="register.address"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        结算类别:
        <el-select v-model="register.settlementCategoryId">
          <el-option
            v-for="item in categorys"
            :key="item.settlementCategoryId"
            :label="item.name"
            :value="item.settlementCategoryId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        看诊日期:
        <el-date-picker v-model="register.consultDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
      <el-col :span="6">
        午别:
        <el-select v-model="register.period">
          <el-option value="上午"></el-option>
          <el-option value="下午"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        挂号科室:
        <el-select v-model="register.departmentId">
          <el-option
            v-for="item in departments"
            :key="item.departmentId"
            :label="item.name"
            :value="item.departmentId"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        号别:
        <el-select v-model="register.registerLevelId">
          <el-option
            v-for="item in levels"
            :key="item.registerLevelId"
            :label="item.name"
            :value="item.registerLevelId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        看诊医生:
        <el-select v-model="register.doctorId">
          <el-option
            v-for="item in doctors"
            :key="item.userId"
            :label="item.name"
            :value="item.userId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        初始号额:
        <el-input style="width:100px" :disabled="true" v-model="limit"></el-input>
      </el-col>
      <el-col :span="6">
        已用号额:
        <el-input style="width:100px" :disabled="true" v-model="usedNumber"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        病历本:
        <el-switch
          v-model="register.isGetBook"
          active-color="#13ce66"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </el-col>
      <el-col :span="8">
        应收金额:
        <el-input style="width:100px" v-model="totalMoney" :disabled="true"></el-input>
      </el-col>
      <el-col :span="8">
        收费方式:
        <el-select v-model="feeType">
          <el-option v-for="item in feeTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { request } from "../request.js";
export default {
  inject: ["reload"],
  data() {
    return {
      sexs: [{ value: 71, label: "男" }, { value: 72, label: "女" }],
      yearTypes: ["岁", "月", "日"],
      departments: [],
      levels: [],
      categorys: [],
      feeTypes: [],
      doctors: [],
      register: {
        medicalRecordNumber: "",
        id: "",
        name: "",
        sex: "男",
        birthday: "",
        year: "",
        yearType: "岁",
        address: "",
        consultDate: new Date(),
        period: "",
        departmentId: "",
        doctorId: "",
        registerLevelId: "",
        settlementCategoryId: "",
        isGetBook: "",
        registrarId: ""
      },
      feeType: "",
      invoiceNumber: "",
      limit: "",
      usedNumber: 0,
      paytable: ""
    };
  },
  methods: {
    getBasicData() {
      request({
        url: "register/basicdata",
        method: "get"
      }).then(res => {
        this.departments = res.data.departments;
        this.levels = res.data.levels;
        this.categorys = res.data.categorys;
        this.feeTypes = res.data.feeTypes;
      });
    },
    getValidNumber() {
      request({
        url: "register/maxNumber",
        method: "get"
      }).then(res => {
        this.register.medicalRecordNumber = res.data;
      });
    },
    getValidInvoiceNumber() {
      request({
        url: "register/invoiceNumber",
        method: "get"
      }).then(res => {
        this.invoiceNumber = res.data;
      });
    },
    getPatientInfo() {
      request({
        url: "register/patient",
        method: "get",
        params: {
          medicalRecordNumber: this.register.medicalRecordNumber
        }
      }).then(res => {
        console.log("hello");

        this.register.name = res.data.name;
        this.register.id = res.data.id;
        this.register.address = res.data.address;
      });
    },
    getAllDoctors() {
      request({
        url: "/register/doctor",
        params: {
          departmentId: this.register.departmentId,
          registerLevelId: this.register.registerLevelId
        }
      }).then(res => {
        this.doctors = res.data;
      });
    },
    getLimitAndValue() {
      this.levels.forEach(item => {
        if (item.registerLevelId == this.register.registerLevelId) {
          this.limit = item.registerLimit;
          this.paytable = item.registerValue;
          return;
        }
      });
    },
    addRegister() {
      request({
        url: "/register/reg",
        method: "post",
        data: this.register
      }).then(res => {
        var status = res.data.status;
        var msg = res.data.msg;
        this.reload();
        this.msgOpen(status, msg);
      });
    },
    // 后期可修改，直接传入success
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
    countUsedNumber() {
      request({
        url: "/register/limit",
        method: "get",
        params: {
          doctorId: this.register.doctorId
        }
      }).then(res => {
        this.usedNumber = res.data;
      });
    },
    refresh() {
      this.reload();
    }
  },
  created() {
    this.getBasicData();
    this.getValidNumber();
    this.getValidInvoiceNumber();
  },
  watch: {
    "register.medicalRecordNumber": function() {
      request({
        url: "register/patient/" + this.register.medicalRecordNumber,
        method: "get"
      })
        .then(res => {
          this.register.name = res.data.name;
          this.register.sex = res.data.sex;
          this.register.year = res.data.year;
          this.register.yearType = res.data.yearType;
          this.register.id = res.data.id;
          this.register.address = res.data.address;
          this.register.birthday = res.data.birthday;
        })
        .catch(res => {
          console.log(res);
        });
    },
    "register.departmentId": function() {
      this.getAllDoctors();
    },
    "register.registerLevelId": function() {
      this.getAllDoctors();
      this.getLimitAndValue();
    },
    "register.doctorId": function() {
      this.countUsedNumber();
    }
  },
  computed: {
    totalMoney: {
      get: function() {
        return this.paytable + eval(this.register.isGetBook);
      },
      set: function() {}
    }
  }
};
</script>
<style scoped>
div {
  line-height: 50px;
}
</style>