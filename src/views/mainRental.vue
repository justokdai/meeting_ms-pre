<template>
    <div class="block">
        <span class="demonstration" style="color:blue;">请选择时间</span>
        <el-date-picker v-model="pickTime" type="date" placeholder="选择日期" size="default" />
    </div>

    <div class="table-container">
        <el-table :data="allMeetingRoom" style="width: 100%;" empty-text="请先登录！！">
            <el-table-column prop="meetingroomId" label="会议室号" width="180" />
            <el-table-column prop="meetingroomSize" label="会议室大小" width="180" />
            <el-table-column prop="meetingroomHeadname" label="会议室负责人" />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="chooseTime(scope.row)">
                        选择时间
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>


    <el-dialog v-model="chooseTimeFormVisible" title="选择租用时间" width="1000">
        <div style="display: flex; flex-direction: row;">
            <div v-for="index in 6" :key="index" style="margin-right: 10px;">
                <el-card style="max-width: 150px">
                    <template #header>
                        <div class="card-header">
                            <span>{{ time_tone[index - 1] }}</span>
                        </div>
                    </template>
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <a v-if="rentaled_times[index - 1]">已被占用</a>
                        <a v-else>空闲</a>
                    </div>
                    <template #footer>
                        <el-button v-if="!rentaled_times[index - 1]" type="primary"
                            @click="chooseDescriptionVisible = true, choosed_time = index">
                            预定会议室
                        </el-button>
                        <el-button v-else type="info" disabled>预定会议室</el-button>
                    </template>
                </el-card>
            </div>
        </div>


        <template #footer>
            <div class="dialog-footer">
                <el-button @click="chooseTimeFormVisible = false">取消</el-button>
                <el-button type="primary" @click=" chooseTimeFormVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="chooseDescriptionVisible" title="请填写会议室用途" width="500">
        <el-form>
            <el-form-item label="理由" :label-width="formLabelWidth">
                <el-input v-model="chooseDescription" autocomplete="off" style="width: 300px;" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="chooseDescriptionVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmchooseTime">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { getAllmeeting, getRentalInfo_request } from '@/api/meetingApi';
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import type { ApiResponse } from '@/interfaces/result';
import { addRequest } from '@/api/requestRoom';
const allMeetingRoom = ref([]);
const userStore = useUserStore();
const userInfo = userStore.user;
const chooseTimeFormVisible = ref(false);
const chooseDescriptionVisible = ref(false);
const chooseDescription = ref('');
const pickTime = ref<Date | null>(null);
const rentaled_times = ref([]);
const time_tone = ["9：00~10：00", "10：00~11：00", "11：00~12：00", "13：00~14：00", "14：00~15：00", "15：00~16：00"]
const formLabelWidth = '140px'
const choosed_room = ref();
const choosed_time = ref();
async function fetchMeetingData() {
    try {
        const response = await getAllmeeting();
        allMeetingRoom.value = response.data; // 假设响应的数据格式符合表格所需的格式
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
        allMeetingRoom.value = []; // user.id 为空时清空数据
    }
})
async function chooseTime(row: any) {
    if (pickTime.value === null) {
        ElMessage({
            message: '请先选择您要查询的日期',
            type: 'warning',
        })
        return;
    }
    choosed_room.value = row;
    console.log(row);
    fetchRentalInfo();
    chooseTimeFormVisible.value = true;

}
async function confirmchooseTime() {
    if (chooseDescription.value === '') {
        ElMessage({
            message: '请求理由不能为空',
            type: 'warning',
        })
        return
    }
    if (pickTime.value != null) {    //这个条件判断真的没什么用
        try {
            const response = await addRequest(userInfo.user_id, choosed_room.value.meetingroomId, pickTime.value, choosed_time.value, chooseDescription.value) as unknown as ApiResponse;
            ElMessage({
                message: '请求成功，审批结果会在1~2个工作日得到，您可以在“会议室审批情况”关注',
                type: 'success',
            })
        } catch (error) {
            console.error("获取会议室信息失败", error);
        }
    }
    chooseDescriptionVisible.value = false;
}

async function fetchRentalInfo() {
    try {
        if (pickTime.value === null)
            return;//显然这不可能  先写着
        const localDateString = pickTime.value.toLocaleDateString('en-CA'); // "2024-08-15"
        console.log(choosed_room.value.meetingroomId);

        const response = await getRentalInfo_request(localDateString, choosed_room.value.meetingroomId) as unknown as ApiResponse;
        rentaled_times.value = response.data.rentaledList;
        console.log(rentaled_times.value);

        // 假设响应的数据格式符合表格所需的格式
    } catch (error) {
        console.error("获取会议室信息失败", error);
    }
}
</script>
<style scoped>
.block {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.block .demonstration {
    font-weight: bold;
    font-size: 18px;
    margin-right: 10px;
    color: #333;
}

.el-date-picker {
    margin-top: 10px;
}

.el-table {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.el-table th {
    background-color: #f0f0f0;
    font-weight: bold;
    color: #555;
}

.el-table-column {
    padding: 12px;
}

.el-button {
    font-weight: bold;
}

.el-button[type="primary"] {
    background-color: #409eff;
    border-color: #409eff;
    color: white;
    border-radius: 4px;
}

.el-button[type="primary"]:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
}

.el-button[link] {
    text-decoration: underline;
    color: #409eff;
}

.el-button[link]:hover {
    color: #66b1ff;
}

/* 容器样式 */
.table-container {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    padding: 20px;
    /* 内边距 */
    background-color: #ffffff;
    /* 背景颜色 */
    border-radius: 10px;
    /* 圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 阴影 */
    margin: 20px auto;
    /* 外边距，自动水平居中 */
    max-width: 1400px;
    /* 最大宽度 */
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