<template>
    <div id="income" style="height: 100%;">
        <el-container>
            <el-header>
                <el-dropdown  @command="handleCommand">
                    <span class="el-dropdown-link" style="font-size: 20px;">
                        选择收入显示规则<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="a">以天为单位显示收入</el-dropdown-item>
                        <el-dropdown-item command="b">以月为单位显示收入</el-dropdown-item>
                        <el-dropdown-item command="c">以年为单位显示收入</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <div class="block">
                              <div id="mjBox" class="centerItem"></div>
                            </div>
                        </div>
                    </el-col>
                    
                </el-row>
                <el-table :data="tableData" border  :cell-style="cellStyle"
                    :header-cell-style="rowClass">
                    <el-table-column prop="time" label="时间">
                    </el-table-column>
                    <el-table-column prop="num" label="订单数">
                    </el-table-column>
                    <el-table-column prop="amount" label="营业额">
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>
                <div class="block" style="text-align: center;">
                    <el-pagination layout="prev, pager, next" :total="50">
                    </el-pagination>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
    import { mapState, mapActions } from "vuex";
    export default {
        data() {
            return {
                //tableDate:[],
            }
        },
        created() { 

        },
        mounted() {
                this.getDailyIncoming().then((res)=>{
                        var data1=[];
                        var data2=[];
                        for(var item of res){
                            data1.push(item.time);
                            data2.push(item.amount);
                            if(data1.length==10)break;
                        }
                        this.drawPie("mjBox",data1,data2)
                    })
        },
        computed: {
            ...mapState("income", ["tableData"])
        },
        methods: {
            drawPie(id,data1,data2){
                let myChart = this.$echarts.init(document.getElementById(id))
            
                myChart.setOption({
                    xAxis: {
                            type: 'category',
                            // axisTick:{show:false},
                        data:data1,
                            boundaryGap: false,
                        },
                    yAxis: {
                        type: 'value',
                        name: '最近收入',
                        axisLabel: {
                            formatter: function (val) {
                                
                                return (val+'元');
                            }
                        },
                    },
                    series: [{
                        name:'最近收入',
                        data: data2,
                        type: 'line',
                        areaStyle: {},
                        smooth:true
                    }]
                
                })

            },
            cellStyle({ row, column, rowIndex, columnIndex }) {
                return "text-align:center";
            },
            rowClass({ row, rowIndex }) {
                return "text-align:center";
            },
            handleCommand(command) {
                if(command=='a'){
                    this.getDailyIncoming().then((res)=>{
                        var data1=[];
                        var data2=[];
                        for(var item of res){
                            data1.push(item.time);
                            data2.push(item.amount);
                            if(data1.length==10)break;
                        }
                        this.drawPie("mjBox",data1,data2)
                    })
                }else if(command=='b'){
                    this.getMonthlyIncoming().then((res)=>{
                        var data1=[];
                        var data2=[];
                        for(var item of res){
                            data1.push(item.time);
                            data2.push(item.amount);
                            if(data1.length==10)break;
                        }
                        this.drawPie("mjBox",data1,data2)
                    })
                }else{
                    this.getYearlyIncoming().then((res)=>{
                        var data1=[];
                        var data2=[];
                        for(var item of res){
                            data1.push(item.time);
                            data2.push(item.amount);
                            if(data1.length==10)break;
                        }
                        this.drawPie("mjBox",data1,data2)
                    })
                }
            },
            ...mapActions("income", ["getDailyIncoming", "getMonthlyIncoming", "getYearlyIncoming"]),

        }
    };
</script>
<style scoped>
    .img,
    .img1,
    .img2 {
        float: left;
    }
    .centerItem{
        height: 350px;
        width: 100%;
    }
    #income {
        text-align: center !important;
    }

    .el-row {
        margin-bottom: 20px;
    }
    .el-row:last-child {
            margin-bottom: 0;
        }

    .el-col {
        border-radius: 4px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 20px;
    }

    .el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        font-size: 25px;
    }

    .el-main {
        font-size: 35px;
        background-color: #E9EEF3;
        color: #333;
        height: 100%;
        flex: 1;
        text-align: center;
    }

    .el-container {
        min-height: 100vh;
        display: flex;
    }

    .bg-purple {
        background: #d3dce6;
    }
</style>