<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 员工信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button> -->
                <!-- <el-select v-model="query.department" placeholder="部门" class="handle-select mr10">
                    <el-option key="1" label="T部门" value="T部门"></el-option>
                    <el-option key="2" label="U部门" value="U部门"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button> -->
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="staff_id" label="ID" width="55" align="center" >
                    <template slot-scope="scope" v-if="scope.$index < query.pageSize">
                        {{scope.row.staff_id}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="gender" label="性别"></el-table-column>

                <el-table-column prop="birth_date" label="出生日期"></el-table-column>
                <el-table-column prop="join_year" label="入职日期"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-lx-text"
                            @click="handleEdit(scope.$index, scope.row)"
                        >生成报表</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-select v-model="reportMonth" placeholder="选择月份">
                    <el-option v-for="(a,index) in month" :key="index" :label="a" :value="a"></el-option>
                </el-select>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { staffinfo_getlist } from '../../api/index';
import { Message } from "element-ui";

export default {
    name: 'basetable',
    data() {
        return {
            month: [1,2,3,4,5,6,7,8,9,10,11,12],
            tableData: [/*{
                id: 0,
                name: 'Shawnee',
                sex: 'Male',
                birthday: '2000-11-27',
                entry_date: '2026-1-2',
                department: 'T部门'
            },{
                id: 1,
                name: 'Beshaba',
                sex: 'Female',
                birthday: '2000-10-31',
                entry_date: '2026-1-2',
                department: 'U部门'
            }*/],
            query: {
                department: '',
                name: '',
                pageIndex: 1,
                pageSize: 50
            },
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 7,
            form: {},
            idx: -1,
            id: -1,
            reportMonth: 1
        };
    },
    created() {
        if (localStorage.getItem('as_rank') != 1) {
            this.getData();
        } 
        
    },
    mounted() {
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
        switch_gender(str){
            if(str == 'female'){
                return '女'
            }
            else{
                return '男'
            }
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            staffinfo_getlist().then(res => {
                this.tableData = res.data.data
                this.pageTotal = res.data.data.length
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // add: 生成报表
        handleEdit(index, row) {
            if (localStorage.getItem('as_depart') != 'Personnel') {
                this.$message.error(`您没有对应权限`)
            } else {
                this.id = this.tableData[index].staff_id;

                // console.log(id);
                this.editVisible = true;
            }
            
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        saveEdit() {
            console.log(this.reportMonth)
            this.$router.push('/report/'+this.reportMonth+'/'+this.id)
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
