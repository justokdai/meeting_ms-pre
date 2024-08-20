<template>
    <div class="approval-container">
        <el-table :data="allApproval" style="width: 100%;" empty-text="暂无数据">
            <el-table-column prop="meetingroomId" label="会议室号" width="180" />
            <el-table-column prop="meetingroomRentaldate" label="申请租用的日期" width="180" />
            <el-table-column prop="meetingroomRentaltime" label="会议时间" width="180" />
            <el-table-column prop="rentalDescribe" label="申请理由" width="250" />
            <el-table-column prop="approval" label="审批情况" width="180">
                <template #default="scope">
                    <el-tag v-if="scope.row.approval === 1" type="success">审核通过</el-tag>
                    <el-tag v-if="scope.row.approval === 0" type="warning">暂未审核</el-tag>
                    <el-tag v-if="scope.row.approval === 2" type="danger">未通过</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
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
<style scoped>
/* 容器样式 */
.approval-container {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    padding: 20px;
    /* 内边距，增加容器周围的空间 */
    background-color: #ffffff;
    /* 背景颜色 */
    border-radius: 10px;
    /* 圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 阴影 */
    margin: 20px auto;
    /* 外边距，自动水平居中 */
    max-width: 1200px;
    /* 最大宽度，防止过宽 */
}

/* 表格样式 */
.el-table {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

/* 表头样式 */
.el-table th {
    color: #ffffff;
    background-color: #409eff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-bottom: 2px solid #e6e6e6;
}

.el-table th .cell {
    font-family: 'Arial', sans-serif;
}

/* 表格行样式 */
.el-table td {
    font-size: 14px;
    color: #333;
    text-align: center;
}

.el-table tr:hover td {
    background-color: #f0f9ff;
}
</style>