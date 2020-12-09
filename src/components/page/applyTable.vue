<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>请假申请单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="员工id">
                        <el-col>{{id}}</el-col>
                    </el-form-item>
                    <el-form-item label="请假种类">
                        <el-col>{{type}}</el-col>
                    </el-form-item>
                    <el-form-item label="请假时段">
                        <el-col :span="4">
                            {{date1}}
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            {{date2}}
                        </el-col>
                    </el-form-item>
                    <el-form-item label="证明材料">
                        <img v-bind:src="file" width="200px"/>
                    </el-form-item>
                    <el-form-item label="请假说明">
                        <!--  <el-input type="textarea" rows="5" v-model="form.desc"> -->
                            {{desc}}
                        <!-- </el-input> --> 
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            id: 0,
            type: '年假',
            date1: '2008-11-22',
            date2: '2020-11-33',
            file:'https://img-blog.csdnimg.cn/20200713225458684.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NoYW9qdW5faml0YQ==,size_16,color_FFFFFF,t_70',
            desc: '哈哈哈哈哈哈哈哈',
        };
    },
    methods: {
        // onSubmit() {
        //     this.$message.success('提交成功！');
        // }
    }
};
</script>