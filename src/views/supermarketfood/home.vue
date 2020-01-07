<template>
    <div id="index">       
        <el-container>
            <el-main>
                <span>订单</span>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                               <p>5</p>
                               <span>新订单</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <p>5</p>
                               <span>催单</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <p>5</p>
                               <span>退单</span>
                            </div></el-col>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <el-container>     
            <el-main>   
                <span>今日收入</span>
                <el-row :gutter="0">
                        <el-col :span="24">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                   <p>233</p>
                                   <span>总单数</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                   <p>￥8888</p>
                                   <span>营业额</span>
                                </div>
                            </el-col>
                        </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>
    el-container{
    margin-top: 20px;
    }
    .el-main {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
  }
    .el-row {
        margin-top: 30px;
        margin-bottom: 50px;

       
    }
     .el-row:last-child {
            margin-bottom: 0;
        }
    .el-col {
        border-radius: 4px;
    }

    .bg-purple {
        background: white;
    }

    .grid-content {
        padding-top: 30px;
        border-radius: 4px;
        min-height: 260px;
    }
    span{
        font-size: 20px;
    }
</style>