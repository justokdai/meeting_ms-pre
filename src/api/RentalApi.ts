import http from "./AxiosConfig";
export const getRentalRequestById = (userId: number) => {
    try {
        const response = http.post('/request/getRentalRequestById', null, {
            params: {
                userId: userId
            },
        });
        return response;
    } catch (error) {
        console.error("获得 会议室审批情况失败:", error);
        throw error;
    }
}