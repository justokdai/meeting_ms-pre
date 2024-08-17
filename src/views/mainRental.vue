<template>
    <div class="block">
        <span class="demonstration">选择时间</span>
        <el-date-picker v-model="pickTime" type="date" placeholder="Pick a day" size="default" />
    </div>
    <el-table :data="allMeetingRoom" style="width: 100%" empty-text="请先登录！！">
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
                        <a v-if="!rentaled_times[index]">空闲</a>
                        <a v-if="rentaled_times[index]">已被占用</a>
                    </div>
                    <template #footer>
                        <el-button v-if="!rentaled_times[index]" type="primary"
                            @click="chooseDescriptionVisible = true, choosed_time = index">预定会议室</el-button>
                        <el-button v-if="rentaled_times[index]" type="info">预定会议室</el-button>
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
    chooseTimeFormVisible.value = true;
    fetchRentalInfo();
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

        const response = await getRentalInfo_request(localDateString, userInfo.user_id) as unknown as ApiResponse;
        console.log(response.data);
        rentaled_times.value = response.data;
        // 假设响应的数据格式符合表格所需的格式
    } catch (error) {
        console.error("获取会议室信息失败", error);
    }
}
</script>