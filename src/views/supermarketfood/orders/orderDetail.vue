<template>
    <div id="pendingDetailed">
        <template>
            <div>
                <h3>订单信息</h3>
                <div>
                    <el-divider></el-divider>
                </div>
                <!-- <el-table
                :data="top"
                style="width: 100%">
                    <el-table-column
                    prop="id"
                    label="订单编号">
                    </el-table-column>
                    <el-table-column
                    prop="time"
                    label="下单时间">
                    </el-table-column>
                    <el-table-column
                    prop="time2"
                    label="预计送达时间">
                    </el-table-column>
                    <el-table-column
                    prop="total"
                    label="总价">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="订单状态">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="骑手电话">
                    </el-table-column>
                    
                </el-table> -->

                <center>
                    <el-divider></el-divider>
                    <el-row :gutter="20" style="margin-bottom:15px">
                        <el-col :span="2" >订单编号</el-col>
                        <el-col :span="6" >下单时间</el-col>
                        <el-col :span="6" >预计送达时间</el-col>
                        <el-col :span="2" >总价</el-col>
                        <el-col :span="2" >订单状态</el-col>
                        <el-col :span="6" >骑手电话</el-col>
                    </el-row>
                    <el-divider style="margin-bottom:15px"></el-divider>
                    <el-row :gutter="20" >
                    <el-col :span="2" >{{form.userOrder.id}}</el-col>
                    <el-col :span="6">{{form.userOrder.orderTime}}</el-col>
                    <el-col :span="6">{{form.userOrder.deliveryTime}}</el-col>
                    <el-col :span="2">{{form.userOrder.status}}</el-col>
                    <el-col :span="2">{{form.userOrder.status}}</el-col>
                    <el-col :span="6">{{form.deliveryman.phoneNumber}}</el-col>
                    </el-row>
                    <el-divider></el-divider>
                </center>

            </div>

            <h3>商品信息</h3>
            <el-divider></el-divider>
            <el-table
              :data="orderAndGoods"
              style="width: 100%"
              
              >
              <el-table-column
                prop="picture"
                label="商品图片">
                <template slot-scope="scope">
                   <img style="height:40px;width:50px" :src="scope.row.goods.picture" alt="">
                </template>
              </el-table-column>
              <el-table-column
                prop="goods.name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="goods.categoryId"
                label="商品类别">
              </el-table-column>
              <el-table-column
                prop="goods.price"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="orderItem.quantity"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="orderItem.amount"
                label="总价">
              </el-table-column>
            </el-table>
            <h3>顾客信息</h3>
            <el-divider></el-divider>
            <div>
                <center>
                    <el-divider></el-divider>
                    <el-row :gutter="20" style="margin-bottom:15px">
                        <el-col :span="2" >顾客</el-col>
                        <el-col :span="6" >地址</el-col>
                        <el-col :span="6" >电话</el-col>
                        <el-col :span="2" >备注</el-col>
                        <el-col :span="6" >取消情况</el-col>
                    </el-row>
                    <el-divider style="margin-bottom:15px"></el-divider>
                    <el-row :gutter="20" >
                    <el-col :span="2" >{{form.customer.nickname}}</el-col>
                    <el-col :span="6">{{form.customer.address}}</el-col>
                    <el-col :span="6">{{form.customer.phoneNumber}}</el-col>
                    <el-col :span="2">{{form.userOrder.notes}}</el-col>
                    <el-col :span="6">{{form.userOrder.cancelReason}}</el-col>
                    </el-row>
                    <el-divider></el-divider>
                </center>
            </div>

            <!-- <el-table
            :data="form"
            style="width: 100%">
            <el-table-column
              prop="customer.nickname"
              label="顾客">
            </el-table-column>
            <el-table-column
              prop="customer.address"
              label="地址">
            </el-table-column>
             <el-table-column
              prop="customer.phoneNumber"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="userOrder.notes"
              label="备注">
            </el-table-column>
            <el-table-column
            prop="userOrder.cancelReason"
            label="取消情况">
            </el-table-column>
          </el-table> -->

          </template>
        
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            form:{},
            // top:[],
            // top:[{
            //     id:'',
            //     total:'',
            //     time:'',
            //     time2:'',
            //     state:'',
            //     phone:''
            // }],
            bottom :[{
                notes:'阿萨德撒大撒多撒大所多',
                customer:'A顾客',
                address:'昆山杰普软件园2单元3号楼401',
                tel:'6546546545'
            }],
          
        }
      },
      computed:{
        ...mapState('orders',['orderAndGoods','total'])
        },
        created(){
            console.log(this.$route.query.row,"订单详情")
            this.form=this.$route.query.row
            console.log("准备赋值",this.form)
            //赋值
            // this.top.push(this.form);
            // console.log(this.top.userOrder.id,"top的值")
            console.log(this.form.userOrder.id,"订单id")
            this.getOrderAndGoods(this.form.userOrder.id)
        },
        methods:{
        ...mapActions('orders',['getOrderAndGoods']),
        // handleCurrentChange(){
        //     console.log(this.pageNum,"dang")
        //     this.findAlldaijiedan(this.form)
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
</script>
<style scoped>
   .el-row {
        margin-bottom: 20px;
        /* &:last-child {
        margin-bottom: 0;
        } */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>