import request from '@/utils/http/index'
import {get,post_array} from '@/utils/http/index'
import {myDelete} from '@/utils/http/index'

const state = {
    PersonalData:[]
}

const mutations = {
    setPersonalData(state, data){
        state.PersonalData=data;
    }
}

const actions = {
    async updatePersonalInfo(context,data){
        console.log("---------------------------------------------------");
        console.log("要上传的图片")
        console.log(data.file,"图片")
        const formData = new FormData();
        formData.append('file', data.file);
        formData.get("file")
        formData.append('file', data.file);
        var response = await request.put("/business?account=" + data.userInfo.account + "&password=" + data.password+"&id=" + data.userInfo.id, formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        });
        console.log(response);
        context.commit("setPersonalData", response.data);
        return response.data;
       // context.dispatch("getPersonalInfo",response.data);
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
