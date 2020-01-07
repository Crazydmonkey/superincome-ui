import request from '@/utils/http/index'
import {get,post_array,post} from '@/utils/http/index'
import {myDelete} from '@/utils/http/index'
import axios from 'axios'

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
    async getGoodsCategory(context, data){
        console.log("js 获取分类信息");
        console.log(data);
        let response = await get("/getGoodsCategory",data);
        console.log(response);
        context.commit("setTable", response.data.list);
        context.commit("setTotal", response.data.total);
    },
    async deleteGoodsCategory(context, data){
        console.log("要删除的分类id",data);
        let response = await request.delete("/deleteGoodsCategory?id="+data);
        context.dispatch("getGoodsCategory",{pageNum:1,pageSize:7,category:'all'});
        console.log(response,"删除");
        return response;
    },
    async addGoodsCategory(context, data){
        console.log(data,'aaa')
        if(data.id!=undefined){
            let response = await request.put("/addGoodsCategory?id="+data.id+"&name="+data.name+"&region="+data.region);
        }else{
            let response = await request.put("/addGoodsCategory?name="+data.name+"&region="+data.region);
        }
        // let response = await post_array("/addGoodsCategory?id=1&name=小米&region=food");
        // let response = await post("/addGoodsCategory"+data);
        console.log(response,"新增或修改");
        context.dispatch("getGoodsCategory",{pageNum:1,pageSize:7,category:'all'});
    },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
