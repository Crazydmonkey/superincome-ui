<template>
  <div class="riders" style="height: 100%;">
 
    <el-container>
      <el-header>
        <h1>员工信息</h1>
      </el-header>
      <el-main>
        <el-button id="add" @click="dialogVisible = true">增加员工</el-button><br/>
        <el-table :data="tableData" border  :cell-style="cellStyle" :header-cell-style="rowClass"
          style="width: 100%" :row-style="{height:'70px'}">
          <el-table-column prop="id" label="序号" width="240">
          </el-table-column>
          <el-table-column prop="account" label="员工姓名" width="240">
          </el-table-column>
          <el-table-column prop="password" label="员工密码" width="240">
          </el-table-column>
          <el-table-column label="执行操作">
            <template slot-scope="scope">
                  <span>
                  <el-button id="update" @click="showModal(scope.row)">修改信息</el-button>
                  </span>
                  <span>
                    <el-button id="add" @click="handleClick(scope.row)">删除信息</el-button><br/>
                  </span>
            </template>
          
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <div class="block" style="text-align: center;">
          <el-pagination :page-size="que.pageSize" :current-page.sync="que.pageNum" layout="prev, pager, next" :total="total"  @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
                <el-input v-model="form.id" placeholder="请输入内容" style="display:none"></el-input>
      <span>员工账号：</span><el-input v-model="form.account" placeholder="请输入内容" style="margin-top:1em"></el-input><br/><br/>
       <span  style="margin-top:1em">员工密码：</span><el-input v-model="form.password" type="password" placeholder="请输入内容"  style="margin-top:1em"></el-input><br/><br/>
           <span style="margin-top:1em">员工头像：</span> 
           <el-upload
  style="margin-top:1em"
    class="avatar-uploader"
    action="http://localhost:8888/business"
    :show-file-list="true"
    :on-success="handleAvatarSuccess"
    :multiple="false"
    :before-upload="beforeAvatarUpload"
    >
    <el-button size="small" type="primary">点击上传</el-button>
   
  </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="SaveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  export default {
    data() {
      return {
        //tableDate:[],
        dialogVisible:false,
        form:{},
        que:{
          pageNum:1,
          pageSize:2,
        },
        
        file:"",
        imageUrl: ''
      }
    },
    created() { },
    mounted() {
      this.findAllWaiter(this.que);
    },
    computed: {
      ...mapState("user", ["tableData",'total'])
    },
    methods: {
      cellStyle({ row, column, rowIndex, columnIndex }) {
        return "text-align:center";
      },
      rowClass({ row, rowIndex }) {
        return "text-align:center";
      },
      pageQuery(val){
        console.log(val)
      },
      SaveOrUpdate(){
        console.log(this.form,"ssss")
        console.log(this.file,"ssss")
        this.updateWaiter({form:this.form,file:this.file});
        this.findAllWaiter(this.que);
        // this.SaveOrUpdateRiders(this.form)
        this.dialogVisible = false
        this.form={}
      },
      handleCurrentChange(val) {
        this.findAllWaiter(this.que);
      },
      handleCancel(){
        this.dialogVisible = false;
        this.form={}
      },
      showModal(row){
        console.log(row)
        this.form=row;
        this.dialogVisible = true;
      },
      ...mapActions("user", ["findAllWaiter","deleteWaiter"]),
      ...mapActions("waiter", ["updateWaiter"]),
      handleClick(item){
            console.log(item,"aaaa")
            console.log(item.id)
            this.deleteWaiter(item.id)
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log(file)
        this.file=file;
      }
    }
  }
</script>
<style type="text/css" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  html,
  body,
  #app,
  .el-container {
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }

  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-main {
    font-size: 35px;
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
    flex: 1;
  }

  .el-container {
    min-height: 100vh;
    display: flex;
  }
</style>