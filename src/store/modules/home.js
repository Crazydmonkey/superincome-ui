import {get} from '@/utils/http/index'

const state = {
    orderData:{},
    incomeData:{}
}

const mutations = {
    setOrderData(state, data){
        state.orderData = data;
    },
    setIncomeData(state,data){
        state.incomeData=data;
    }
}

const actions = {
    async getOrderData(context, data){
        let response = await get("/getOrderData");
        console.log(response,"aaaaaaaaaaaa");
        context.commit("setOrderData", response.data);
    },
    async getCurrentIncomingData(context,data){
        let response = await get("/incoming/currentIncoming");
        console.log("当天收入",response.data);
        context.commit("setIncomeData", response.data);
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
