import {get} from '@/utils/http/index'
import request from '@/utils/http/index'
import {post,post_array} from '@/utils/request'

export default {
  namespaced:true,
  state:{
    orders:[],
    message:''
  },
  getters:{
    filterOrdersByStatus(state){
      return (status)=>{
        return state.orders.filter((item)=>{
          return item.status === status;
        })
      }
    }
  },
  mutations:{
    resetOrders(state,orders){
      state.orders = orders;
    },
    resetMessage(state,message){
      state.message = message;
    }
  },
  actions:{
    // 取消派单
    async cancelSendOrder({commit,dispatch},orderId){
      let response = await get("/order/cancelSendOrder",{orderId});
      dispatch("findAllOrders");
      return response;
    },
    // 派单
    async sendOrder({commit,dispatch},params){
      let response = await get("/order/sendOrder",params);
      dispatch("findAllOrders");
      return response;
    },
    // 查询所有订单
    async findAllOrders({commit}){
      let response = await get("/order/findAll");
      response.data.forEach((item)=>{
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss') 
      })
      commit("resetOrders",response.data);
    },
    async batchDeleteCategory(context,ids){
        // 1. 批量删除
        let response = await request.post("/category/batchDelete",{ids})
        // 2. 分发
        context.dispatch("findAllCategories");
        // 3. 返回结果
        return response;
      },
      async deleteCategoryById(context,id){
        let response = await request.get("/category/deleteById?id="+id);
        context.dispatch("findAllCategories");
        return response;
      },
      async batchDeleteCustomer(context,ids){
        // 1. 批量删除
        let response = await post_array("/customer/batchDelete",{ids})
        // 2. 分发
        context.dispatch("findAllCustomers");
        // 3. 返回结果
        return response;
      },
  }
}