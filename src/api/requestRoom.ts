import http from "./AxiosConfig";

export const addRequest = (userId: number, meetingroomId: number, meetingroomRentaldate: Date, meetingroomRentaltime: number, rentalDescribe: string) => {
    try {
        const response = http.post('/request/addRequest', {
            userId: userId,
            meetingroomId: meetingroomId,
            meetingroomRentaldate: meetingroomRentaldate,
            meetingroomRentaltime: meetingroomRentaltime,
            rentalDescribe: rentalDescribe,
        });
        return response;
    } catch (error) {
        console.error("请求失败", error);
        throw error;
    }
}