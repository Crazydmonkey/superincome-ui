<template>
    <div id="cancelled">
            <el-table
              :data="overorder"
              style="width: 100%">
             <el-table-column
                type="selection"
                width="55">
             </el-table-column>
              <el-table-column
                prop="userOrder.orderTime"
                label="销售日期">
              </el-table-column>
               <el-table-column
                prop="userOrder.id"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="customer.nickname"
                label="客户">
              </el-table-column>
               <el-table-column
                prop="customer.phoneNumber"
                label="手机号">
              </el-table-column>
              <el-table-column
                prop="customer.address"
                label="收货地址">
              </el-table-column>
             <el-table-column
                prop="userOrder.amount"
                label="金额">
              </el-table-column>
              <el-table-column
                prop="caozuo"
                label="操作"
                width="250px">
                <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="showDetails(scope.row)">查看详情</el-button>
                      </template>
              </el-table-column>
            </el-table>
            <el-pagination :page-size="1" :current-page.sync="form.pageNum" layout="prev, pager, next" :total="total4"  @current-change="handleCurrentChange" style="margin-left:90%"></el-pagination>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'

export default {
    data() {
      return {
         form:{
          pageNum:0,
          pageSize:0,
          status:"已取消"
        }
      }
    },
    computed:{
      ...mapState('orders',['overorder','total4'])
    },
    created(){
      this.findAllOverOrder(this.form)
    },
    methods:{
      ...mapActions('orders',['findAllOverOrder']),
      handleCurrentChange(){
        console.log(this.pageNum,"dang")
      },
      showDetails(row){
        console.log("查看订单详情");
        console.log(row);
        this.$router.push({path:"/orderDetail",query:{row:row}})

      },
     
    }
}
</script>
<style scoped>

</style>