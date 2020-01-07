<template>
    <div id="addproduct">
        <el-form ref="form" :model="form" label-width="300px" style="margin-top:1em">
          
                <el-form-item label="商品名称：" prop="name" :rules="[
                { required: true, message: '名称不能为空'},
              ]">
                  <el-input v-model="form.name" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="商品分区" prop="category" :rules="[
                { required: true, message: '分区不能为空'},
              ]">
                        <el-select v-model="form.category" @change='selectCategory'>
                          <el-option label="超市" value="shopping"></el-option>
                          <el-option label="餐饮" value="food"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="商品类别" prop="category" :rules="[
                { required: true, message: '类别不能为空'},
              ]">
                            <el-select v-model="form.categoryId">

                              <el-option :label="item.name" :value="item.id"  v-for="item in tableData" :key="item.id"></el-option>
                            </el-select>
                </el-form-item>
                <el-form-item label="商品售价：" style="width: 80%" prop="price" :rules="[
                { required: true, message: '价格不能为空'},
                { type: 'number', message: '价格必须为数字值'}
              ]">
                        <el-input v-model.number="form.price"  placeholder="保留两位小数"></el-input>
                </el-form-item>
                <el-form-item label="商品进价：" style="width: 80%" prop="cost" :rules="[
                { required: true, message: '价格不能为空'},
                { type: 'number', message: '价格必须为数字值'}
              ]"> 
                        <el-input v-model.number="form.cost" placeholder="保留两位小数"></el-input>
                </el-form-item>
                <el-form-item label="*商品图片：">
                  <!-- <img :src="form.picture" style="width:50px;height:40px"> -->
                <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                :on-change="hello"
                :file-list="fileList">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                      
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
              </el-upload>

                </el-form-item>
                <el-form-item label="产品描述：" style="width: 80%">
                  <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="商品数量：" style="width: 80%">
                        <el-input v-model="form.quantity"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">保存商品</el-button>
                </el-form-item>
              </el-form>
    </div>
</template>
<script>
    
import { mapActions, mapState } from 'vuex';  
export default {
    data() {
      return {
        form: {
          id:"",
          name:"",
          quantity:"",
          description:"",
          price:"",
          cost:"",
          categoryId:"",
          category:"",
          picture:""
        },
        fileList: [{name: 'food.jpeg',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        file:""
      }
    },
    created(){
      console.log(this.$route.query.row)
      if(this.$route.query.row){
        this.form=this.$route.query.row;
        this.fileList=[{name:'shopping.jpg',url:this.$route.query.row.picture}];
      }
    },
    computed:{
      ...mapState('goodsCategory',['tableData'])
    },
    methods: {
      ...mapActions('repast',['addAndUpdateGoods']),
       ...mapActions("goodsCategory", ["getGoodsCategory"]),
      onSubmit() {
        console.log('submit!');
        console.log(this.form);
        console.log(this.file,"为什么没有");
        // console.log(file);
        this.addAndUpdateGoods({form:this.form,file:this.file});
      },
      hello(file,fileList){
        console.log("得到文件对象");
        console.log(file);
        this.file=file.raw;
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log("处理下载");
        console.log(file);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      selectCategory(){
          console.log("先显示上一行")
          console.log(this.form.category)
          // this.que.category=this.region1
          // console.log(this.que,"当前页面分类显示情况")
          this.getGoodsCategory({pageNum:1,pageSize:7,category:this.form.category})
          // this.que.category=all
      },
      // beforeAvatarUpload(file) {
      //   console.log(file)
      //   this.file=file
      //   // const isJPG = file.type === 'image/jpeg';
      //   // const isLt2M = file.size / 1024 / 1024 < 2;

      //   // if (!isJPG) {
      //   //   this.$message.error('上传头像图片只能是 JPG 格式!');
      //   // }
      //   // if (!isLt2M) {
      //   //   this.$message.error('上传头像图片大小不能超过 2MB!');
      //   // }
      //   // return isJPG && isLt2M;
      //   return false;
      // }
      
    }
}
</script>
<style scoped>
    .avatar-uploader .el-upload {
    border: 5px dashed red;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>