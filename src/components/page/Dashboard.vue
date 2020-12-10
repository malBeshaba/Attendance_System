<template>
    <div>
        <el-row :gutter="20" id="row1">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>ID：{{id}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        所属部门：
                        <span>{{department}}</span>
                    </div>
                    <div class="user-info-list">
                        职位：
                        <span> {{rank_switch(position)}} </span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:400px;">
                    <div slot="header" class="clearfix">
                        <span>假期余额</span>
                    </div>
                    年假
                    <el-progress v-bind:percentage="holidays_list.annual_leave.percentage" v-bind:color="holidays_list.annual_leave.color"></el-progress>
                    病假
                    <el-progress v-bind:percentage="holidays_list.sick_leave.percentage" v-bind:color="holidays_list.sick_leave.color"></el-progress>
                    事假
                    <el-progress v-bind:percentage="holidays_list.compassionate_leave.percentage" v-bind:color="holidays_list.compassionate_leave.color"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-remind grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{holidays}}</div>
                                    <div>剩余假期</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2" @click="leave">
                                <i class="el-icon-lx-punch grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>请假</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3" @click="punch">
                                <i class="el-icon-lx-locationfill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>打卡</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>请假记录</span>
                    </div>
                    <el-table @row-click="goto" :show-header="false" :data="leaveList" style="width:100%;">
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                >{{leave_type(scope.row.type)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="170">
                            <template slot-scope="scope">
                                <div class="todo-date">{{scope.row.start_time.slice(0, 10)}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
                <div style="height:20px;">
                </div>
                <div class="left-wrap">
                <div class="dakaqian" style="height:10px;">  
                </div >
                <div class="daka">
                        <span class="ka">打卡记录</span>
                </div>
                <el-calendar v-model="value">
                <template
                slot="dateCell"
                slot-scope="{data}">
                <div>
                   <p :class="dealMyDate(data.day)? 'is-selected' : ''">
                   <!--   {{ data.day.split('-').slice(1).join('-') }} {{ dealMyDate(data.day)}} -->
                    {{ data.day.split('-').slice(1).join('-') }}<br />{{ dealMyDate(data.day) ? '✔️' : ''}}<br />{{''}}<br />{{''}}<br />{{''}}
                   </p>
                </div>
                </template>
                </el-calendar>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import { location } from '../../utils/Location'
import { leave_record } from '../../api/index'
import { holiday_self } from '../../api/index'
import { month_report } from '../../api/index'
import { clockIn } from '../../api/index'

export default {
    name: 'dashboard',
    data() {
        return {
            arr: ['2020/12/11','2020/12/12'],
            id: localStorage.getItem('as_id'),
            name: localStorage.getItem('ms_username'),
            department: localStorage.getItem('as_depart'),
            position: localStorage.getItem('as_rank'),
            holidays: 0,
            color_l: {
                green: '#42b983',
                yellow: '#f1e05a',
                red: '#f56c6c'
            },
            holidays_list: {/*int */
                annual_leave: {
                    percentage: 71.3,
                    color: '#42b983'
                },
                sick_leave: {
                    percentage: 71.3,
                    color: '#42b983'
                },
                compassionate_leave: {
                    percentage: 71.3,
                    color: '#42b983'
                }
            },
            leaveList: [],
            local: {
                lat: '',
                lng: '',
                province: '',
                city: '',
                district: '',
                detail: ''
            },
             resDate: [
                {"date":"2020-12-15","content":"已打卡"},
                {"date":"2020-12-16","content":"已打卡"},
                {"date":"2020-12-17","content":"已打卡"}
            ],

            value: new Date(2020,0,1)
        };
    },
    components: {
        Schart
        // Calendar
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    created() {
        let id = localStorage.getItem('as_id')
        leave_record(id).then(res => {
            this.leaveList = res.data.data
        })
        holiday_self(id).then(res => {
            this.holidays_list.annual_leave.percentage = res.data.data.annual * 100 / 5
            this.holidays_list.sick_leave.percentage = res.data.data.sick * 100 / 5
            this.holidays_list.compassionate_leave.percentage = 100 
        })
        month_report(1, id).then(res => {
            this.resDate = res.data.check_records
        })
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    mounted: function() {

        this.$nextTick(() => {
                // 点击前一个月
                let prevBtn = document.querySelector(
                    '.el-calendar__button-group .el-button-group>button:nth-child(1)');
                prevBtn.addEventListener('click', () => {
                    // console.log(this.value);
                })
        })


        this.$nextTick(() => {
                // 点击后一个月
                let prevBtn = document.querySelector(
                    '.el-calendar__button-group .el-button-group>button:last-child');
                prevBtn.addEventListener('click', () => {
                    // console.log(this.value);
                })
        })

        this.getLocation();
    },
    methods: {
        rank_switch(i) {
            switch(i) {
                case '1': return '普通员工'
                case '2': return '部门经理'
                case '3': return '总经理'
            }
        },
        leave_type(str) {
            switch(str) {
                case 'annual': return '年假'
                case 'compassionate': return '事假'
                case 'sick': return '病假'
            }
        },
        dealMyDate(v) {
            // console.log(v)
            let len = this.resDate.length
            let res = ""
            for(let i=0; i<len; i++){
                this.resDate[i].checktime = this.resDate[i].checktime.slice(0,10)
                if(this.resDate[i].checktime == v) {
                    /* res = this.resDate[i].content */
                    return true
                    break
                }
            }
            return false
        },
        getLocation() {
            let _that = this;
            let geolocation = location.initMap("map-container"); //定位
            AMap.event.addListener(geolocation, "complete", result => {
                console.log(result)
                _that.local.lat = result.position.lat;
                _that.local.lng = result.position.lng;
                _that.local.province = result.addressComponent.province;
                _that.local.city = result.addressComponent.city;
                _that.local.district = result.addressComponent.district;
                _that.local.detail = result.formattedAddress;
            });
        },
        goto(row) {
            // console.log()
            this.$router.push("/apply/"+row.leave_record_id);
        },
        leave() {
            this.$router.push("/form");
        },
        punch() {
            // if (this.local.district == '津南区') {
            //     this.$message.success(`打卡成功`);
            // } else {
            //     this.$message.false(`打卡失败`);
            // }
            // this.$router.push("/src/components/page/404.vue");
            let date = new Date()
            let month = date.getMonth() + 1
            let time = date.getFullYear()+'-'+month+'-'+date.getDate()
            console.log(time)
            let place = this.local.province + this.local.district
            console.log(place)
            clockIn(time, place, this.id).then(res => {
                                    console.log(res.data.code)

                if (res.data.code == 0) {
                    this.$message.success(`打卡成功`)
                } else {
                    this.$message.false(`打卡失败`)
                }
            })
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.todo-date {
    font-size: 14px;
}

.schart {
    width: 100%;
    height: 300px;
}

</style>
<style>
.is-selected {
    margin-bottom: 0px;
    color: #1989FA;
    background-color:darkorange;
}

.left-wrap{
    width: 100%;
}
.row1{
    height: 100%;
}

.daka{
    background-color: #fff;
}
.dakaqian{
    background-color: #fff;
}
.ka{
    margin-left: 20px;
}
</style>
