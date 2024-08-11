<template>
    <div class="main_UserContent" style="height: 100%">
        <el-button @click="login_dialogFormVisible = true" v-if="user_id === ''" type="primary">登录</el-button>
        <div v-else class="main_UserLogined">
            <el-icon :size="30">
                <User />
            </el-icon>
            <el-button @click="loginout" style="margin-left: 10px;" type="primary">退出</el-button>
        </div>
    </div>
    <el-dialog v-model="login_dialogFormVisible" title="用户登录" width="500">
        <el-form :model="login_form">
            <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="login_form.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="login_form.password" autocomplete="off" />
            </el-form-item>
        </el-form>
        <el-link @click="login_dialogFormVisible = false; register_dialogFormVisible = true;"
            type="primary">没有账号？点击这里</el-link>
        <!-- <div style="text-align: right;">
            <el-link type="primary">没有账号？点击这里</el-link>
        </div> -->
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="login_dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="login">
                    登录
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="register_dialogFormVisible" title="注册" width="500">
        <el-form :model="register_form">
            <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="register_form.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="register_form.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="register_form.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="register_form.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="register_form.password" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="register_dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="register">
                    注册
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { useUserStore } from '@/stores/user'
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
const userInfo = useUserStore().user;
const user_id = userInfo.user_id;
const login_dialogFormVisible = ref(false)
const register_dialogFormVisible = ref(false)
const formLabelWidth = '140px'
function loginout() {
    //将状态钟大哥用户置为空
    useUserStore().login_out();
}
function register() {

    ElMessage({
        message: '注册成功，请登录',
        type: 'success',
    })
    register_dialogFormVisible.value = false;
    login_dialogFormVisible.value = true;
}
function login() {
    ElMessage({
        message: '登录成功',
        type: 'success',
    })
}
const login_form = reactive({
    username: '',
    password: ''
})
const register_form = reactive({
    username: '',
    password: '',
    age: 0,
    email: '',
    tel: ''
})

</script>

<style scoped>
.main_UserContent {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 100vh;
    /* 占满整个视口高度 */
}

.main_UserLogined {
    display: contents;
}
</style>
