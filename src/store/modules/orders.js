import request from '@/utils/http/index'
import {get} from '@/utils/http/index'


const state = {
    //订单项、商品信息
    orderAndGoods:[],
    // 待接单
    daiorderlist:[],
    total:5,
    // 待发货
    canorderlist:[],
    total1:0,
    // 已完成
    comorderlist:[],
    total2:0,
    // 待收货
    daireorder:[],
    total3:0,
    // 已取消
    overorder:[],
    total4:0,
    // 催单
    cuiorder:[],
    total5:0,
    // 退款订单
    backmoney:[],
    total6:0,

    
}

const mutations = {
    setorderlist(state, data){
        state.daiorderlist = data;
    },
    setTotal(state,data){
        state.total=data;
    },
    setcanorderlist(state, data){
        state.canorderlist = data;
    },
    setTotal1(state,data){
        state.total1=data;
    },
    setcomorderlist(state, data){
        state.comorderlist = data;
    },
    settotal2(state,data){
        state.total2=data;
    },
    setdaireorder(state, data){
        state.daireorder = data;
    },
    settotal3(state,data){
        state.total3=data;
    },
    setoverorder(state, data){
        state.overorder = data;
    },
    settotal4(state,data){
        state.total4=data;
    },
    setcuiorder(state,data){
        state.cuiorder=data;
    },
    settotal5(state,data){
        state.total5=data;
    },
    setbackmoney(state,data){
        state.backmoney=data;
    },
    settotal6(state,data){
        state.total6=data;
    },

    setOrderAndGoods(state,data){
        state.orderAndGoods=data;
    },
}

const actions = {
    async findAlldaijiedan(context, data){
        let response = await get("/getOrderConditionPage2",data);
        console.log(response);
        context.commit("setorderlist", response.data.list);
        context.commit("setTotal", response.data.total);
        return response;
    },
    async findAlldaifahuo(context, data){
        let response = await get("/getOrderConditionPage2",data);
        console.log(response);
        context.commit("setcanorderlist", response.data.list);
        context.commit("setTotal1", response.data.total);
        return response;
    },
    async findAllComOrder(context, data){
        let response = await get("/getOrderConditionPage2",data);
        console.log(response);
        context.commit("setcomorderlist", response.data.list);
        context.commit("settotal2", response.data.total);
        return response;
    },
    async findAllDaiRecive(context, data){
        let response = await get("/getOrderConditionPage2",data);
        console.log(response);
        context.commit("setdaireorder", response.data.list);
        context.commit("settotal3", response.data.total);
        return response;
    },
    async findAllOverOrder(context, data){
        let response = await get("/getOrderConditionPage2",data);
        console.log(response);
        context.commit("setoverorder", response.data.list);
        context.commit("settotal4", response.data.total);
        return response;
    },
    async findAllCuiorder(context, data){
        let response = await get("/getOrderConditionPage2",data);
        console.log(response);
        context.commit("setcuiorder", response.data.list);
        context.commit("settotal5", response.data.total);
        return response;
    },
    async findAllBackmoney(context, data){
        let response = await get("/getOrderConditionPage2",data);
        console.log(response);
        context.commit("setbackmoney", response.data.list);
        context.commit("settotal6", response.data.total);
        return response;
    },
    // 接单
    async reOrder(context, data){
        let response = await request.put('acceptOrder?orderId='+data);
        console.log(response);
        context.dispatch('findAlldaijiedan',{pageNum:1,pageSize:5,status:"待接单"})
        return response;
    },
    // 拒绝订单
    async jujueOrder(context, data){
        let response = await request.put('updateCancelReason?isCanceled='+data.isCanceled+"&orderId="+data.id+"&reason="+data.reason);
        console.log(response);
        context.dispatch('findAlldaijiedan',{pageNum:1,pageSize:5,status:"待接单"})
        return response;
    },
    // 确认发货
    async querenfahuo(context, data){
        console.log("实现我的愿望吧");
        console.log(data.id);
        let response = await request.put('updateDeliveryman?delivermanId='+data.id+"&orderId="+data.oid);
        // updateDeliveryman?deliverymanId=22&orderId=
        console.log(response);
        context.dispatch('findAlldaifahuo',{pageNum:1,pageSize:5,status:"待发货"})
        return response;
    },
    // 催单
    async cuiDan(context, data){
        let response = await request.put('setOrderReminder?reminder='+data.reminder+"&orderId="+data.oid);
        console.log(response);
        context.dispatch('findAllCuiorder',{pageNum:1,pageSize:5,isCanceled:"催单"})
        return response;
    },
    // 接受退款
    async reciveBackMoney(context, data){
        
        let response = await request.put('updateCancelReason?isCanceled='+data.isCanceled+"&orderId="+data.id+"&reason=");
        console.log(response);
        let rr=await get("/refund/"+data.id);
        context.dispatch('findAlldaijiedan',{pageNum:1,pageSize:5,isCanceled:"顾客"})
        return rr;
    },
    // 查询订单项及商品信息
    async getOrderAndGoods(context, data){
        console.log(data,"查询订单项及商品信息");
        let response = await get('getOrderAndGoods?orderId='+data);
        
        console.log(response.data[0].goods,"原始图片");
        response.data.forEach(element => {
            // console.log(element.goods.picture,"原始图片");
            element.goods.picture="http://localhost:8888/image/"+element.goods.picture;
        });
        console.log(response.data,"检索成功");
        context.commit("setOrderAndGoods", response.data);
        return rr;
    },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
