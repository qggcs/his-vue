<template>
  <div>
    <el-row>
      <h3>患者信息查询</h3>
    </el-row>
    <el-row>
      <el-col>
        病历号:
        <el-input style="width:150px" v-model="medicalRecordNumber" placeholder="请输入病历号"></el-input>
        <el-button type="primary" @click="getChargeInfo" icon="el-icon-search">搜索</el-button>
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
      <h3>患者消费信息</h3>
    </el-row>
    <el-row>
      <el-table
        style="width:100%"
        :data="records"
        tooltip-effect="dark"
        ref="mulTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="病历号" width="180">
          <p>{{medicalRecordNumber}}</p>
        </el-table-column>
        <el-table-column label="姓名" width="180">{{name}}</el-table-column>
        <el-table-column prop="medicineName" label="项目名称" width="300"></el-table-column>
        <el-table-column prop="unitPrice" label="单价" width="180"></el-table-column>
        <el-table-column prop="count" label="数量" width="100"></el-table-column>
        <el-table-column label="开立时间" width="350">{{openDate | formatDate}}</el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="getInvoiceMoney" icon="el-icon-wallet">收费结算</el-button>
        <el-button @click="toggleSelection">取消选择</el-button>
      </div>
    </el-row>

    <el-dialog
      title="发票信息(收费)"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
      center
      style="line-height:50px"
    >
      <el-row>
        <el-col :span="14">
          发票号(可修改):
          <el-input v-model="invoice.invoiceNumber" style="width:150px"></el-input>
        </el-col>
        <el-col :span="10">
          病历号:
          <el-input v-model="medicalRecordNumber" style="width:150px"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          患者姓名:
          <el-input v-model="name" style="width:150px"></el-input>
        </el-col>
        <el-col :span="10">
          支付方式:
          <el-select v-model="invoice.feeType" style="width:150px">
            <el-option v-for="item in feeTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          应收金额:
          <el-input v-model="invoice.invoiceValue" style="width:150px"></el-input>
        </el-col>
        <el-col :span="10">
          实收金额:
          <el-input v-model="actually" style="width:150px"></el-input>
        </el-col>
      </el-row>
      <el-row>
        找零金额:
        <el-input v-model="change" style="width:150px"></el-input>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="charge">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "../request";
import Axios from "axios";
export default {
  inject: ["reload"],
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")),
      records: [],
      medicalRecordNumber: "",
      name: "",
      id: "",
      address: "",
      register: {},
      openDate: Date.parse(new Date()),
      multipleSelection: [],
      dialogVisible: false,
      invoice: {
        invoiceNumber: "",
        invoiceValue: 0,
        operatorId: 0,
        registerId: 0,
        feeType: ""
      },
      feeTypes: [],
      actually: "",
      details: []
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  computed: {
    change: function() {
      return eval(this.actually) - eval(this.invoice.invoiceValue);
    }
  },
  methods: {
    getChargeInfo() {
      request({
        url: "/records",
        method: "get",
        params: {
          medicalRecordNumber: this.medicalRecordNumber
        }
      }).then(res => {
        this.register = res.data.personal;
        this.records = res.data.records;
        this.name = this.register.name;
        this.id = this.register.id;
        this.address = this.register.address;
      });
    },
    toggleSelection() {
      this.$refs.mulTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getValidNumber() {
      request({
        url: "/register/invoiceNumber",
        method: "get"
      }).then(res => {
        this.invoice.invoiceNumber = res.data;
      });
    },
    getInvoiceMoney() {
      this.dialogVisible = true;
      this.invoice.operatorId = this.user.userId;
      this.invoice.registerId = this.register.registerId;
      var tmp = this.multipleSelection;
      var total = 0;
      this.details = [];
      tmp.forEach(item => {
        total += eval(item.count) * eval(item.unitPrice);
        this.details.push(eval(item.detailId));
      });

      this.invoice.invoiceValue = total;
    },
    getFeeTypes() {
      request({
        url: "/register/basicdata",
        method: "get"
      }).then(res => {
        this.feeTypes = res.data.feeTypes;
      });
    },
    charge() {
      this.dialogVisible = false;
      request({
        url: "/charge",
        method: "post",
        data: this.invoice,
        params: {
          details: this.details
        }
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
    }
  },
  created() {
    this.getValidNumber();
    this.getFeeTypes();
  }
};
</script>
<style>
div {
  line-height: 50px;
}
</style>