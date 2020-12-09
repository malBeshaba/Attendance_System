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
                        <el-input v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="请假种类">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option key="nj" label="年假" value="nj"></el-option>
                            <el-option key="bj" label="病假" value="bj"></el-option>
                            <el-option key="hj" label="婚假" value="hj"></el-option>
                            <el-option key="cjj" label="产检假" value="cjj"></el-option>
                            <el-option key="cj" label="产假" value="cj"></el-option>
                            <el-option key="brj" label="哺乳假" value="brj"></el-option>
                            <el-option key="pcj" label="陪产假" value="pcj"></el-option>
                            <el-option key="sj" label="事假" value="sj"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请假时段">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="起始日期"
                                v-model="form.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="截至日期"
                                v-model="form.date2"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="证明材料">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false">
                            <el-button style="margin-bottom: 10px;" size="medium" type="text">选取文件</el-button>
                            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload> 
                        <!-- <el-dialog :visible.sync="updataAddFlag">
                                   <img width="100%" :src="updataAddImg" alt="">
                        </el-dialog>  -->
                    </el-form-item>
                    
                    <el-form-item label="请假说明">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
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
            /* options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
                                    value: 'tianhe',
                                    label: '天河区'
                                },
                                {
                                    value: 'haizhu',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: 'dongguan',
                            label: '东莞市',
                            children: [
                                {
                                    value: 'changan',
                                    label: '长安镇'
                                },
                                {
                                    value: 'humen',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'hunan',
                    label: '湖南省',
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ], */
            form: {
                id: '',
                type: '',
                date1: '',
                date2: '',
                file:'',
                desc: '',
            },
            fileList: [],
        };
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        onSubmit() {
            this.$message.success('提交成功！');
        },
    }
};
</script>
