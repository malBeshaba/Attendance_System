<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="员工id">
                        <el-col>{{id}}</el-col>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-col>{{name}}</el-col>
                    </el-form-item>
                    <el-form-item label="签到情况">
                        <el-col :span="4">
                            <label class="blue">{{punch_date}}</label>/{{date}}
                        </el-col>
                    </el-form-item>
                  
                    <el-form-item label="请假情况">
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
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {month_report} from '../../api/index'
export default {
    name: 'baseform',
    data() {
        return {
            id: 0,
            month: 0,
            name: 'Shawnee',
            punch_date: 22,
            date: 31,
            leave_list: [{
                title: '年假',
                date: '2000-11-11'
            }],
            wages: 30000
        };
    },
    created() {
        this.id = this.$route.params.id
        this.month = this.$route.params.month
        console.log(this.month)
        month_report(this.month, this.id).then(res => {
            
        })
    },
    methods: {
        getDate() {
            nowDate = new Date();
            this.date = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate()
        }
    }
};
</script>
<style scoped>
.todo-item {
    font-size: 14px;
}
.todo-date {
    font-size: 14px;
}
.blue {
    color: #58B2DC;
}
</style>