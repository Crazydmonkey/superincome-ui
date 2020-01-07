<template>
  <div class="riders" style="height: 100%;">
    <el-container>
      <el-header>
        <h1>骑手信息</h1>
      </el-header>
      <el-main>
        <el-button id="add" @click="dialogVisible = true">增加骑手</el-button><br/>
        <el-table :data="tableData" border  :cell-style="cellStyle" :header-cell-style="rowClass"
          style="width: 100%" :row-style="{height:'70px'}">
          <el-table-column prop="id" label="序号" width="240">
          </el-table-column>
          <el-table-column prop="name" label="骑手姓名" width="240">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="骑手电话" width="240">
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
      <span>骑手姓名：</span><el-input v-model="form.name" placeholder="请输入内容" style="margin-top:1em"></el-input><br/><br/>
       <span  style="margin-top:1em">骑手电话：</span><el-input v-model="form.phoneNumber" placeholder="请输入内容"  style="margin-top:1em"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
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
          pageSize:2
        }
      }
    },
    created() { },
    mounted() {
      this.getRiders(this.que);
    },
    computed: {
      ...mapState("riders", ["tableData",'total'])
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
        this.SaveOrUpdateRiders(this.form)
        this.dialogVisible = false
        this.form={}
      },
      handleCurrentChange(val) {
         this.getRiders(this.que);
      },
      showModal(row){
        console.log(row)
        this.form=row;
        this.dialogVisible = true
      },
      ...mapActions("riders", ["getRiders", "deleteRiders",'SaveOrUpdateRiders']),
      handleClick(item){
            console.log(item,"aaaa")
            console.log(item.id)
            this.deleteRiders(item.id)
      }
    }
  }
</script>
<style type="text/css" scoped>
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