<template>
    <div id="super">
         <el-form :inline="true" :model="formInline" class="demo-form-inline" type="flex" 
            justify="center" style="margin-top:1em;margin-left:.5em">
                    <el-form-item>
                      <el-input v-model="formInline.name" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                            <el-button type="primary" @click="onSubmit" style="margin-left:-1.1em"><i class="el-icon-search"></i></el-button>
                    </el-form-item>
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
        </el-form>
        <el-table
            :data="superlist"
            style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            prop="id"
            width="55">
            </el-table-column>
            <el-table-column
            label="商品图"
            width="280">
            <template slot-scope="scope">
                   <img style="height:40px;width:50px" :src="scope.row.picture" alt="">
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
                       :total="total1"
                       type="flex" 
                       justify="center" style="margin-left:90%">
        </el-pagination>
        
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    data(){
        return {
            formInline:{
                pageNum:1,
                pageSize:5
            },
            multipleSelection:[],
            
        }
    },
    created(){
        this.findAllSuper(this.formInline)
        this.findAllShopCategory()
    },
    computed:{
        //superlist 商品信息集合   shopcategory  超市商品类别列表
         ...mapState('repast',['superlist','total1','shopcategory']),
    },
    methods:{
        ...mapActions('repast',['findAllSuper','findAllShopCategory','batchDeleteShop','superContextQuery']),
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
        },
        handleEdit(index, row) {
            console.log(index, row);
            row.category="shopping"
            this.$router.push({path:"/goods/addproduct",query:{row:row}})
        },
        handleDelete(index, row) {
            this.batchDeleteShop({ids:row.id}).then(()=>{
                 this.findAllSuper({pageNum:1,
          pageSize:5,})
              })
        },
        onSubmit(){
            console.log(this.formInline.name)
            if(this.formInline.name!=null){
                this.superContextQuery(this.formInline.name)
            }
        },
        batchDelete(){
            console.log(this.multipleSelection)
          
            this.multipleSelection.forEach((item)=>{
              this.batchDeleteShop({ids:item.id}).then(()=>{
                 this.findAllSuper({pageNum:1,
          pageSize:5,})
              })
            })
           
        }
    }
}
</script>
<style scoped>

</style>