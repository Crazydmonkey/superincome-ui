import request from '@/utils/http/index'
import {get,post_array} from '@/utils/http/index'
import {myDelete} from '@/utils/http/index'


const state = {
    tableData:[],
    total:20,
}

const mutations = {
    setTable(state, data){
        state.tableData = data;
    },
    setTotal(state,data){
        state.total=data;
    }
}

const actions = {
    async getRiders(context, data){
        let response = await get("/deliverymans/page",data);
        //console.log(response);
        context.commit("setTable", response.data.list);
        context.commit("setTotal", response.data.total);
    },
    async deleteRiders(context, data){
        let response = await request.delete("/deliveryman/"+data);
        context.dispatch("getRiders",{pageNum:1,pageSize:5});

        return response;
    },
    async SaveOrUpdateRiders(context, data){
        console.log(data,'aaa')
        let response = await post_array("/deliveryman",data);
        //console.log(response);
        context.dispatch("getRiders",{pageNum:1,pageSize:5});
    },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
