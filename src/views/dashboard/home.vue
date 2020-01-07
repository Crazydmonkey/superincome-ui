    <template>
    <div id="index" style="vertical-align: middle;text-align: center;">
     
        <el-container>
            <el-main>
                <span>订单</span>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <p style="color:royalblue;font-size: 40px;" @click="todeterminded">
                                    {{orderData.added}}
                                </p>
                                <span @click="todeterminded">新订单</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <p style="color:gold;font-size: 40px;" @click="tocuidan">
                                    {{orderData.chargeback}}
                                </p>
                                <span @click="tocuidan">催单</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <p style="color: red;font-size: 40px;" @click="tobackmoney">
                                    {{orderData.reminder}}
                                </p>
                                <span @click="tobackmoney">退单</span>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <el-container v-if="incomeData!=undefined">
            <el-main>
                <span>今日收入({{incomeData.time}})</span>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <p style="font-size: 40px;">
                                    {{incomeData.num}}
                                </p>
                                <span>总单数</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <p style="font-size: 40px;">
                                  ￥{{incomeData.amount}}
                                </p>
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
    import { mapState, mapActions } from "vuex"
    export default {
        data() {
            return {

            };
        },

        created() {
             this.getOrderData(),
            this.getCurrentIncomingData()
        },
        mounted() {
           
        },
        computed: {
            ...mapState("home", ["orderData", "incomeData"])
        },

        methods: {
            ...mapActions('home', ["getOrderData", "getCurrentIncomingData"]),
            todeterminded() {
                this.$router.replace('/orders/determined')
            },
            tocuidan() {
                this.$router.replace('/orders/cuidan')
            },
            tobackmoney() {
                this.$router.replace('/orders/backmoney')
            }
        }
    }
</script>
<style scoped>
    el-container {
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
        padding-top: 10px;
        border-radius: 4px;
        min-height: 240px;
    }

    span {
        font-size: 20px;
    }
</style>