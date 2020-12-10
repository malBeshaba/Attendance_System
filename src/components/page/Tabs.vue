<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i>审批信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`需审批(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{leave_type(scope.row.type)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="190">
                            <template slot-scope="scope">
                                <el-button class="allow" size="small" @click="allow(scope.$index)">同意</el-button>
                                <el-button class="refuse" size="small" @click="refuse(scope.$index)">拒绝</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已审批(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.type}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`全部申请信息(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{leave_type(scope.row.type)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { approve_getlist } from '../../api/index'
import { approve } from '../../api/index'
import { Message } from "element-ui";

    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                unread: [],
                read: [/*{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }*/],
                recycle: [/*{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }*/]
            }
        },
        created() {
             if (localStorage.getItem('as_rank') != 1) {
                this.loadData();
            } 
        },
        mounted: function() {
           this.$nextTick(()=>{

            if(localStorage.getItem('as_rank') == 1) {
                this.$message({
                    type: 'error',
                    message: '无权限'
                })
            }

           });


        },
        methods: {
            leave_type(str) {
                switch(str) {
                    case 'annual': return '年假'
                    case 'compassionate': return '事假'
                    case 'sick': return '病假'
                }
            },
            loadData: function () {
                approve_getlist(2003).then(res => {
                    this.unread = res.data.data;
                })
            },
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            },
            allow(index) {
                let obj = {
                    staff_id: 2003,
                    leave_record_id: this.unread[index].leave_record_id,
                    is_agree: true,
                    reason: "同意"
                }
                approve(obj).then(res => {
                    if (res.data.code == 0) {
                        const item = this.unread.splice(index, 1);
                        console.log(item);
                        item[0].type = this.leave_type(item[0].type) + '(同意)'
                        this.read = item.concat(this.read);
                    } else {
                        this.$message.false(`审批失败`)
                    }
                })
            },
            refuse(index) {
                let obj = {
                    staff_id: 2003,
                    leave_record_id: this.unread[index].leave_record_id,
                    is_agree: false,
                    reason: "拒绝"
                }
                approve(obj).then(res => {
                    if (res.data.code == 0) {
                        const item = this.unread.splice(index, 1);
                        console.log(item);
                        item[0].type = this.leave_type(item[0].type) + '(拒绝)'
                        this.read = item.concat(this.read);
                    } else {
                        this.$message.false(`审批失败`)
                    }
                })
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
.allow {
    background-color: forestgreen;
    color: white;
}
.refuse {
    background-color: red;
    color: white;
}

</style>

