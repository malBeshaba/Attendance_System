<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>东莞</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:600px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                    年假
                    <el-progress v-bind:percentage="holidays_list.annual_leave.percentage" v-bind:color="holidays_list.annual_leave.color"></el-progress>
                    病假
                    <el-progress v-bind:percentage="holidays_list.sick_leave.percentage" v-bind:color="holidays_list.sick_leave.color"></el-progress>
                    婚假
                    <el-progress v-bind:percentage="holidays_list.marriage_hollday.percentage" v-bind:color="holidays_list.marriage_hollday.color"></el-progress>
                    产假
                    <el-progress v-bind:percentage="holidays_list.maternity_leave.percentage" v-bind:color="holidays_list.maternity_leave.color"></el-progress>
                    产检假
                    <el-progress v-bind:percentage="holidays_list.maternity_check.percentage" v-bind:color="holidays_list.maternity_check.color"></el-progress>
                    哺乳假
                    <el-progress v-bind:percentage="holidays_list.lactation_leave.percentage" v-bind:color="holidays_list.lactation_leave.color"></el-progress>
                    陪产假
                    <el-progress v-bind:percentage="holidays_list.paternity_leave.percentage" v-bind:color="holidays_list.paternity_leave.color"></el-progress>
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
                    <el-table @row-click="goto" :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="170">
                            <template slot-scope="scope">
                                <div class="todo-date">{{scope.row.date}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16">
                <!-- <Calendar
                class="calendar"
                :markDate=arr
                
                ></Calendar> -->
            </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import { location } from '../../utils/Location'
import Calendar from 'vue-calendar-component';
// import axios from 'axios'
export default {
    name: 'dashboard',
    data() {
        return {
            arr: ['2020/12/11','2020/12/12'],
            name: localStorage.getItem('ms_username'),
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
                marriage_hollday: {
                    percentage: 71.3,
                    color: '#42b983'
                },
                maternity_leave: {
                    percentage: 71.3,
                    color: '#42b983'
                },
                maternity_check: {
                    percentage: 71.3,
                    color: '#42b983'
                },
                lactation_leave: {
                    percentage: 71.3,
                    color: '#42b983'
                },
                paternity_leave: {
                    percentage: 71.3,
                    color: '#42b983'
                },
                compassionate_leave: {
                    percentage: 71.3,
                    color: '#42b983'
                }
            },
            todoList: [
                {
                    title: '今天要修复100个bug',
                    date: '2020-11-1 10:22'
                },
                {
                    title: '今天要修复100个bug',
                    date: '2020-11-1 10:22'
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    date: '2020-11-1 10:22'
                },
                {
                    title: '今天要修复100个bug',
                    date: '2020-11-1 10:22'
                },
                {
                    title: '今天要修复100个bug',
                    date: '2020-11-1 10:22'
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    date: '2020-11-1 10:22'
                }
            ],
            local: {
                lat: '',
                lng: '',
                province: '',
                city: '',
                district: ''
            }
        };
    },
    components: {
        Schart,
        Calendar
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
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
        this.getLocation();
    },
    methods: {
        getLocation() {
            let _that = this;
            let geolocation = location.initMap("map-container"); //定位
            AMap.event.addListener(geolocation, "complete", result => {
                console.log(result)
                _that.local.lat = result.position.lat;
                _that.local.lng = result.position.lng;
                _that.local.province = result.position.province;
                _that.local.city = result.addressComponent.city;
                _that.local.district = result.addressComponent.district;
            });
        },
        goto() {
            this.$router.push("/apply");
        },
        leave() {
            this.$router.push("/calendar");
        },
        punch() {
            if (this.local.district == '津南区') {
                this.$message.success(`打卡成功`);
            } else {
                this.$message.false(`打卡失败`);
            }
            // this.$router.push("/src/components/page/404.vue");
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
.calendar {
    background-color: white;
}
</style>
