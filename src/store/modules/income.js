import request from '@/utils/http/index'
import {get} from '@/utils/http/index'
import {myDelete} from '@/utils/http/index'

const state = {
    tableData:[]
}

const mutations = {
    setTable(state, data){
        state.tableData = data;
    }
}

const actions = {
    async getDailyIncoming(context, data){
        let response = await get("/incoming/dailyIncomingDuringMonth");
        console.log(response);
        context.commit("setTable", response.data);
        return response.data;
    },
    async getMonthlyIncoming(context, data){
        let response = await get("/incoming/monthlyIncomingDuringYear");
        //console.log(response);
        context.commit("setTable", response.data);
        return response.data;
    },
    async getYearlyIncoming(context, data){
        let response = await get("/incoming/yearlyIncoming");
        //console.log(response);
        context.commit("setTable", response.data);
        return response.data;
    }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
