<template>
    <div id="sendgoods">
         <el-table
              :data="backmoney"
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
                         <el-button type="success" size="small" @click="receiveOrder(scope.row)">接受</el-button>
                        <el-button type="danger" size="small" @click="refuseOrder(scope.row)">拒绝</el-button>
                      </template>
              </el-table-column>
            </el-table>
            <el-pagination :page-size="1" :current-page.sync="form.pageNum" layout="prev, pager, next" :total="total6"  @current-change="handleCurrentChange" style="margin-left:90%"></el-pagination>
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
          isCanceled:"顾客"
        }
      }
    },
    computed:{
      ...mapState('orders',['backmoney','total6'])
    },
    created(){
      this.findAllBackmoney(this.form)
    },
    methods:{
      ...mapActions('orders',['findAllBackmoney','reciveBackMoney']),
      handleCurrentChange(){
        console.log(this.pageNum,"dang")
      },
      showDetails(row){
        console.log("查看订单详情");
        console.log(row);
        this.$router.push({path:"/orderDetail",query:{row:row}})

      },
      receiveOrder(row){
        console.log("接受退款")
        this.reciveBackMoney({isCanceled:"商家",id:row.userOrder.id,reason:"ssss"})
      },
      refuseOrder(row){
        console.log("拒绝退款")
      }
    }
}
</script>
<style scoped>

</style>