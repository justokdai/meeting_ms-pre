import http from "./AxiosConfig";

export const getAllmeeting = () => {
    try {
        const response = http.post('/meeting/getAllMeetingInfo');
        return response;
    } catch (error) {
        console.error("获取会议室信息失败", error);
        throw error;
    }
}
export const getRentalInfo_request = (rentaldate: string, meetingroomId: number) => {
    try {
        const response = http.post('/rental/getRentalInfo', {
            rentaldate: rentaldate,
            meetingroomId: meetingroomId
        });
        return response;
    } catch (error) {
        console.error("获取会议室信息失败", error);
        throw error;
    }
}