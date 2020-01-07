import request from '@/utils/http/index'
import {get} from '@/utils/http/index'
import {myDelete} from '@/utils/http/index'

const state = {
    
}

const mutations = {
   
}

const actions = {
    async updateWaiter(context, data){
        console.log(data.file,"aaa")
        const formData = new FormData();
        formData.append('file', data.file);
        formData.get("file")
        formData.append('file', data.file);
        const {id}=data.form
        // console.log(formData)
        if(id!=undefined){
            let response = await request.put("/business?account="+data.form.account+"&password="+data.form.password+"&id="+data.form.id,formData,{
                headers:{'Content-type':'multipart/form-data'}
            });
        }
        else{
            let response = await request.put("/business?account="+data.form.account+"&password="+data.form.password,formData,{
                headers:{'Content-type':'multipart/form-data'}
            });
        }
        console.log(response);
        // context.commit("setTable", response.data);
        return response.data;
    }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
