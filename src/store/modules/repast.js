import request from '@/utils/http/index'
import {get,post} from '@/utils/http/index'
import qs from 'qs'
const state = {
    repastlist:[],
    total:10,
    superlist:[],
    total1:10,
    foodcategory:[],
    shopcategory:[],
}

const mutations = {
    setRepastlist(state,data){
        state.repastlist=data;
    },
    setTotal(state,data){
        state.total=data;
    },
    setSuperlist(state,data){
        state.superlist=data;
    },
    setTotal1(state,data){
        state.total1=data;
    },
    setFoodCate(state,data){
        state.foodcategory=data;
    },
    setShopCategory(state,data){
        state.shopcategory=data;
    }
}

const actions = {
    // context:commit(调用mutations中的方法),dispatch(调用actions里的方法)
    //查找所有的美食商品
    async findAllRepast(context,data){
        delete data.region;
        let response = await get("/findGoods/goodsAll/food/page",data);
        //图片增加前缀
        response.data.list.forEach(element => {
            element.picture="http://192.168.1.73:8889/image/"+element.picture;
        });
        console.log(response,"ssssss")
        // commit("resetOrders",response.data);
        context.commit("setRepastlist",response.data.list)
        context.commit("setTotal",response.data.total)
        return response;
    },
    //查找超市所有商品
    async findAllSuper(context,data){
        let response = await get("/findGoods/goodsAll/shopping/page",data);
        console.log(response,"ssssss")
        // commit("resetOrders",response.data);
        //图片增加前缀
        response.data.list.forEach(element => {
            element.picture="http://192.168.1.73:8889/image/"+element.picture;
        });
        context.commit("setSuperlist",response.data.list)
        context.commit("setTotal1",response.data.total)
        return response;
    },
    async findAllFoodCategory(context,data){
        let response = await get("/findGoods/goodsCategory/food");
        console.log(response,"ssssss")
        // commit("resetOrders",response.data);
        context.commit("setFoodCate",response.data)
        return response;
    },
    //根据商品所属分区(超市|餐饮)查找商品类别列表
    async findAllShopCategory(context,data){
        let response = await get("/findGoods/goodsCategory/shopping");
        console.log(response,"ssssss")
        // commit("resetOrders",response.data);
        context.commit("setShopCategory",response.data)
        
        return response;
    },
    async QueryFoodCategory(context,data){
        let response = await get("/findGoods/goods/"+data);
        console.log(response,"ssssss")
        // commit("resetOrders",response.data);
        context.commit("setRepastlist",response.data)
        context.commit("setTotal",response.data.length)
        return response;
    },
    //批量删除超市食品
    async batchDeleteShop(context,data){
        let response = await request.delete("/goods/many",{params:data});
        console.log(response,"ssssss")
        // commit("resetOrders",response.data);
        // context.dispatch("findAllRepast",data.form)
        return response;
    },
    //检索超市商品
    async superContextQuery(context,data){
        let response = await get("/findGoods/goods/shopping/"+data);
        console.log(response,"ssssss")
        context.commit("setSuperlist",response.data)
        context.commit("setTotal1",response.data.length)
        // commit("resetOrders",response.data);
        // context.dispatch("findAllRepast",data.form)
        return response;
    },
    //添加或修改商品
    async addAndUpdateGoods(context,data){
        console.log("北极星");
        console.log(data);
        console.log(data.form.id,"aaa")
        console.log("要上传的图片")
        console.log(data.file,"图片")

        const formData = new FormData();
        formData.append('file', data.file);
        formData.get("file")
        formData.append('file', data.file);
        let response = await request.put("/goods?id="+data.form.id+"&name="+data.form.name+"&picture="+data.form.picture+"&price="+data.form.price+"&quantity="+data.form.quantity+"&description="+data.form.description+"&categoryId="+data.form.categoryId+"&collectionNumber="+data.form.collectionNumber+"&category="+data.form.category+"&cost=1",formData,{
            headers:{'Content-type':'multipart/form-data'}
        });
        // let response=await post("/goods?id"+{id:data.form.id, name:data.form.name, picture:data.form.picture, price:data.form.price, quantity:data.form.quantity, description:data.form.description, categoryId:data.form.categoryId, collectionNumber:data.form.collectionNumber, formData  });
        // console.log(response,"ssssss")
        
        // commit("resetOrders",response.data);
        // context.dispatch("findAllRepast",data.form)
        // return response;
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
