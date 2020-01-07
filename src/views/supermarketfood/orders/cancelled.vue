<template>
    <div id="sendgoods">
        <template>
            <el-table
              :data="canorderlist"
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
                width="250px">
                <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="showDetails(scope.row)">查看详情</el-button>
                        <el-button type="success" size="small" @click="add(scope.row)">确认发货</el-button>
                </template>
              </el-table-column>
            </el-table>
        </template>
        <el-pagination :page-size="1" :current-page.sync="form.pageNum" layout="prev, pager, next" :total="total1"  @current-change="handleCurrentChange" style="margin-left:90%"></el-pagination>

        <!-- Form -->
        <el-dialog title="选择骑手" :visible.sync="dialogFormVisible">
          <el-form :model="form1">
            <el-form-item label="骑手姓名" :label-width="formLabelWidth" >
              <el-select v-model="info.deliverymanId" placeholder="请选择骑手" >
                <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="fahuoOk()">确 定</el-button>
          </div>
        </el-dialog>

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
          status:"待发货"
        },
        dialogFormVisible: false,
        form1: {
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        info:{}
      }
    },
    computed:{
      ...mapState('orders',['canorderlist','total1']),
      ...mapState("riders", ["tableData"])
    },
    created(){
      this.findAlldaifahuo(this.form)
      this.getRiders({pageNum:0,pageSize:0})
    },
    methods:{
      ...mapActions("riders", ["getRiders"]),
      ...mapActions('orders',['findAlldaifahuo','querenfahuo']),
      handleCurrentChange(){
        console.log(this.pageNum,"dang")
      },
      showDetails(row){
        console.log("查看订单详情");
        console.log(row);
        this.$router.push({path:"/orderDetail",query:{row:row}})

      },
      fahuoOk(){
        console.log("神龙");
        console.log(this.info)
        // 指派骑手
        this.querenfahuo({id:this.info.deliverymanId,oid:this.info.id})
        this.dialogFormVisible = false
      },
      add(row){
        console.log("出现吧");
        console.log(row);
        this.info=row.userOrder;
        this.dialogFormVisible = true
        // 指派骑手
        // this.querenfahuo({id:1,oid:row.userOrder.id})
      }
     
    }
}
</script>
<style scoped>

</style>