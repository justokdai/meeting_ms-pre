<template>
    <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">{{ userInfo.user_name }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ userInfo.user_age }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ userInfo.user_tel }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ userInfo.user_email }}</el-descriptions-item>
    </el-descriptions>
    <div class="button_group">
        <el-button type="success" @click="editUser_visiable = true" round>修改账号信息</el-button>
        <el-button type="success" @click="updatePassword_visiable = true" round>修改密码</el-button>
    </div>

    <el-dialog v-model="editUser_visiable" title="修改账号信息" width="500">
        <el-form :model="edit_form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="edit_form.user_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="edit_form.user_age" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="edit_form.user_email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="edit_form.user_tel" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="editUser_visiable = false">取消</el-button>
                <el-button type="primary" @click="edit_userInfo">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="updatePassword_visiable" title="修改密码" width="500">
        <el-form :model="updatePassword_visiable_form">
            <el-form-item label="旧密码" :label-width="formLabelWidth">
                <el-input v-model="updatePassword_visiable_form.oldPassword" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="updatePassword_visiable_form.newPassword" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updatePassword_visiable = false">取消</el-button>
                <el-button type="primary" @click="updatePassword">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup lang="ts">
import { user_updatePassword, userinfo_updata } from '@/api/userApi';
import type { ApiResponse } from '@/interfaces/result';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const editUser_visiable = ref(false);
const updatePassword_visiable = ref(false);
const userStore = useUserStore();
const userInfo = reactive(userStore.user);
const formLabelWidth = '140px'

const edit_form = reactive({
    user_name: userInfo.user_name,
    user_age: userInfo.user_age,
    user_email: userInfo.user_email,
    user_tel: userInfo.user_tel,
})

const updatePassword_visiable_form = reactive({
    oldPassword: '',
    newPassword: ''
})

import { watch } from 'vue';
const loadEditForm = () => {
    edit_form.user_name = userInfo.user_name;
    edit_form.user_age = userInfo.user_age;
    edit_form.user_email = userInfo.user_email;
    edit_form.user_tel = userInfo.user_tel;
};

watch(() => editUser_visiable.value, (newValue) => {
    if (newValue) {
        loadEditForm();
    }
});

async function edit_userInfo() {
    const response = await userinfo_updata(userInfo.user_id, edit_form.user_name, edit_form.user_age, edit_form.user_email, edit_form.user_tel) as unknown as ApiResponse;
    ElMessage({
        message: '账号信息更新成功',
        type: 'success',
    });
    userStore.update(edit_form.user_name, edit_form.user_age, edit_form.user_email, edit_form.user_tel);
    editUser_visiable.value = false;
}
async function updatePassword() {
    const response = await user_updatePassword(userInfo.user_id, updatePassword_visiable_form.oldPassword, updatePassword_visiable_form.newPassword) as unknown as ApiResponse;
    if (response.code === 1) {
        ElMessage({
            message: '密码修改成功',
            type: 'success',
        });
        updatePassword_visiable.value = false;
        updatePassword_visiable_form.newPassword = '';
        updatePassword_visiable_form.oldPassword = '';
    } else {
        ElMessage.error("输入的旧密码错误");
    }
}
</script>

<style scoped>
.button_group {
    display: flex;
}
</style>
