<template>
    <div class="main_UserContent" style="height: 100%">
        <el-button @click="login_dialogFormVisible = true" v-show="!userInfo_visiblo" type="primary">登录</el-button>
        <div v-show="userInfo_visiblo" class="main_UserLogined">
            <el-popover placement="bottom" :width="400" trigger="hover">
                <template #reference>
                    <el-icon :size="30">
                        <User />
                    </el-icon>
                </template>
                <userInfoView></userInfoView>
            </el-popover>

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
import { user_login } from '@/api/userApi';
import userInfoView from '@/components/userInfoView.vue'
import { useTokenStore } from '@/stores/token';
import type { ApiResponse } from '@/interfaces/result';
const userStore = useUserStore();
const tokenStore = useTokenStore();
const userInfo = userStore.user;
const login_dialogFormVisible = ref(false)
const register_dialogFormVisible = ref(false)
const userInfo_visiblo = ref(false);
const formLabelWidth = '140px'
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
function loginout() {
    //将状态中用户置为空
    userStore.login_out();
    userInfo_visiblo.value = false;
    tokenStore.setnull;
}

function register() {

    ElMessage({
        message: '注册成功，请登录',
        type: 'success',
    })
    register_dialogFormVisible.value = false;
    login_dialogFormVisible.value = true;
}


async function login() {
    try {
        const response = await user_login(login_form.username, login_form.password) as unknown as ApiResponse;
        if (response.code === 0) {
            ElMessage.error(response.msg)
        }
        else {
            // 在这里可以处理登录成功后的逻辑
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            login_dialogFormVisible.value = false;
            console.log(response);
            userInfo.user_id = response.data.userId;
            userInfo.user_name = response.data.userName;
            userInfo.user_age = response.data.userAge;
            userInfo.user_email = response.data.userEmail;
            userInfo.user_tel = response.data.userTel;
            userInfo_visiblo.value = true;
            tokenStore.token = response.data.token;
        }

    } catch (err) {
        // error.value = 'Login failed. Please check your credentials.';
        // console.error('Login error:', err);
    }

}


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
