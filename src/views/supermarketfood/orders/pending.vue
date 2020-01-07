<template>
    <div id="determined">
           <el-table
              :data="comorderlist"
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
                prop="rider"
                label="骑手">
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
            <el-pagination :page-size="5" :current-page.sync="form.pageNum" layout="prev, pager, next" :total="total2"  @current-change="handleCurrentChange" style="margin-left:90%"></el-pagination>

    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'

export default {
    data() {
      return {
        form: {
          pageNum:1,
          pageSize:5,
          status:"已完成"
        },
        
      }
    },
    computed:{
      ...mapState('orders',['comorderlist','total2'])
    },
    created(){
      this.findAllComOrder(this.form)
    },
    methods:{
      ...mapActions('orders',['findAllComOrder']),
      handleCurrentChange(){
        console.log(this.pageNum,"dang")
      },
      showDetails(row){
        console.log("查看订单详情");
        console.log(row);
        this.$router.push({path:"/orderDetail",query:{row:row}})

      }
    }
}
</script>
<style scoped>

</style>