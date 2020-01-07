<template>
    <div id="repast">
       <el-form :inline="true" :model="formInline" class="demo-form-inline" type="flex" 
            justify="center" style="margin-top:1em;margin-left:.5em">
                    <el-form-item label="商品类别">
                      <el-select v-model="formInline.region" placeholder="商品类别" @change="onSubmit">
                        <el-option :label="item.name" v-for="item in foodcategory" :key="item.id" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
        </el-form>
            <el-table
              :data="repastlist"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column
              type="selection"
              prop="id"
              width="55"></el-table-column>
              <el-table-column
                label="商品图"
                width="280">
                <template slot-scope="scope">
                   <img :src="scope.row.picture" style="width:50px;height:40px">  
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="collectionNumber"
                label="收藏数">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="库存">
              </el-table-column>
              <el-table-column
                prop="caozuo"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                       background
                        layout="prev, pager, next"
                       :total="total"
                       type="flex" 
                       justify="center" style="margin-left:90%">
            </el-pagination>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
      return {
        formInline:{
          pageNum:1,
          pageSize:5,
        },
        multipleSelection:[]
      }
    },
    created(){
      this.findAllRepast(this.formInline)
      this.findAllFoodCategory();
    },
    computed:{
      ...mapState('repast',['repastlist','total','foodcategory']),
    },
    methods: {
      ...mapActions('repast',['findAllRepast','findAllFoodCategory','QueryFoodCategory','batchDeleteShop']),
       handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
        },
        handleEdit(index, row) {
            row.category="food"
            this.$router.push({path:"/goods/addproduct",query:{row:row}})
        },
        handleDelete(index, row) {
            this.batchDeleteShop({ids:row.id}).then(()=>{
                 this.findAllRepast({pageNum:1,
          pageSize:5,})
              })
        },
        onSubmit(){
          console.log(this.formInline.region)
          this.QueryFoodCategory(this.formInline.region)
        },
        batchDelete(){
            console.log(this.multipleSelection)
          
            this.multipleSelection.forEach((item)=>{
              this.batchDeleteShop({ids:item.id}).then(()=>{
                 this.findAllRepast({pageNum:1,
          pageSize:5,})
              })
            })
           
        }
    }
  }

</script>
<style scoped>

</style>