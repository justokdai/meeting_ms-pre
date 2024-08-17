<template>
    <a>这里是会议室审批情况</a>

    <el-table :data="allApproval" style="width: 100%" empty-text="暂无数据">
        <el-table-column prop="meetingroomId" label="会议室号" width="180" />
        <el-table-column prop="meetingroomRentaldate" label="申请租用的日期" width="180" />
        <el-table-column prop="meetingroomRentaltime" label="会议时间" width="180" />
        <el-table-column prop="rentalDescribe" label="申请理由" width="180" />
        <el-table-column prop="approval" label="审批情况">
            <template #default="scope">
                <el-tag v-if="scope.row.approval === 1" type="success">审核通过</el-tag>
                <el-tag v-if="scope.row.approval === 0" type="warning">暂未审核</el-tag>
                <el-tag v-if="scope.row.approval === 2" type="danger">未通过</el-tag>
            </template>
        </el-table-column>
    </el-table>

</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref, watch } from 'vue';
import { getRentalRequestById } from '@/api/RentalApi';
import type { ApiResponse } from '@/interfaces/result';
const allApproval = ref();
const userStore = useUserStore();
const userInfo = userStore.user;
async function fetchMeetingData() {
    try {
        const response = await getRentalRequestById(userInfo.user_id) as unknown as ApiResponse;
        allApproval.value = response.data; // 假设响应的数据格式符合表格所需的格式
        console.log(response);

    } catch (error) {
        console.error("获取会议室信息失败", error);
    }
}
onMounted(async () => {
    if (userInfo.user_id != -1) {
        fetchMeetingData();
    }
});

// 监听 user.id 的变化
watch(() => userInfo.user_id, (newId) => {
    if (newId != -1) {
        fetchMeetingData(); // user.id 不为空时获取数据
    } else {
        allApproval.value = []; // user.id 为空时清空数据
    }
})
</script>