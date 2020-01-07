<template>
  <div class="riders" style="height: 100%;">
    <el-container>
      <el-header>
        <h1>商品类别管理</h1>
      </el-header>
      <el-main>
        <el-button id="add" @click="dialogVisible = true">增加类别</el-button>
        <span>
            <el-select placeholder="请选择显示类别" @change='selectCategory' v-model="region1">
                <el-option label="全部" value="all" @click="selectCategory(all)"></el-option>
                <el-option label="超市" value="shopping"></el-option>
                <el-option label="美食" value="food"></el-option>
            </el-select>

        </span><br/>
        <el-table :data="tableData" border  :cell-style="cellStyle" :header-cell-style="rowClass"
          style="width: 100%" :row-style="{height:'70px'}">
          <el-table-column prop="id" label="序号" width="240">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="240">
          </el-table-column>
          <el-table-column prop="region" label="区域" width="240">
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
        <el-input v-model="form.id" placeholder="请输入内容" style="display:none" ></el-input>
      <span>类别名称：</span><el-input v-model="form.name" placeholder="请输入商品类别名称" style="margin-top:1em" ></el-input><br/><br/>
        <span  style="margin-top:1em">类别区域：</span>
            <!-- <el-input v-model="form.phoneNumber" placeholder="请输入内容"  style="margin-top:1em"></el-input> -->
            <el-select v-model="form.region"  placeholder="请选择">
                <el-option label="超市"  value="shopping"></el-option>
                <el-option label="美食" value="food"></el-option>
            </el-select>

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
          select: '',
          region1:"",


        //tableDate:[],
        dialogVisible:false,
        form:{
        },
        que:{
          pageNum:1,
          pageSize:7,
          category:'all'
        }
      }
    },
    created() { },
    mounted() {
        this.getGoodsCategory(this.que);
    },
    computed: {
    //   ...mapState("riders", ["tableData",'total']),
       ...mapState("goodsCategory", ["tableData",'total'])
    },
    methods: {
        ...mapActions("goodsCategory", ["getGoodsCategory", "deleteGoodsCategory",'addGoodsCategory']),
      cellStyle({ row, column, rowIndex, columnIndex }) {
        return "text-align:center";
      },
      rowClass({ row, rowIndex }) {
        return "text-align:center";
      },
      //分页显示
     handleCurrentChange(val) {
        console.log(this.que,"当前页面分类显示情况")
        this.getGoodsCategory(this.que);
     },
     //分类显示
      selectCategory(){
          console.log("先显示上一行")
          console.log(this.region1)
          this.que.category=this.region1
          console.log(this.que,"当前页面分类显示情况")
          this.getGoodsCategory(this.que)
          this.que.category=all
      },
      //新增 修改信息
        SaveOrUpdate(){
            console.log(this.form,"ssss")
            this.addGoodsCategory(this.form)
            this.dialogVisible = false
            this.form={}
            this.getGoodsCategory(this.que);
        },
        //删除信息
        handleClick(item){
            console.log(item,"删除")
            console.log(item.id)
            this.deleteGoodsCategory(item.id)
        },
      






      pageQuery(val){
        console.log(val)
      },
      showModal(row){
        console.log(row)
        this.form=row;
        this.dialogVisible = true
      },
    //   ...mapActions("riders", ["getRiders", "deleteRiders",'SaveOrUpdateRiders']),
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