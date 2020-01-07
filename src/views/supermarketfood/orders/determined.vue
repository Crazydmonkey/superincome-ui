<template>
    <div id="pending">
        <template>
            <el-table
              :data="daiorderlist"
              style="width: 100%">
               <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="userOrder.id"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="userOrder.orderTime"
                label="下单时间">
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
                width="300px">
                <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="showDetails(scope.row)">查看详情</el-button>
                        <el-button type="success" size="small" @click="receiveOrder(scope.row)">接受订单</el-button>
                        <el-button type="danger" size="small" @click="refuseOrder(scope.row)">拒绝订单</el-button>
                      </template>
              </el-table-column>
            </el-table>
          </template>
          <el-pagination :page-size="form.pageSize" 
                  :current-page.sync="form.pageNum" 
                  layout="prev, pager, next" :total="total"  
                  @current-change="handleCurrentChange" 
                  style="margin-left:90%"></el-pagination>
          
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
      return {
        form:{
          pageNum:1,
          pageSize:5,
          status:"待接单"
        }
      }
    },
    computed:{
      ...mapState('orders',['daiorderlist','total'])
    },
    created(){
      this.findAlldaijiedan(this.form)
    },
    methods:{
      ...mapActions('orders',['findAlldaijiedan','reOrder','jujueOrder']),
      handleCurrentChange(){
        console.log(this.pageNum,"dang")
        this.findAlldaijiedan(this.form)
      },
      showDetails(row){
        console.log("查看订单详情");
        console.log(row);
        this.$router.push({path:"/orderDetail",query:{row:row}})

      },
      receiveOrder(row){
        console.log(row.userOrder.id)
        this.reOrder(row.userOrder.id)
      },
      refuseOrder(row){
        this.jujueOrder({isCanceled:"商家",id:row.userOrder.id,reason:"取消原因"})
      }
    }
}
</script>
<style scoped>

</style>