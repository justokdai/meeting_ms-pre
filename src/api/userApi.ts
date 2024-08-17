import http from './AxiosConfig';
// 用户登录请求
export const user_login = (username: string, password: string) => {
    try {
        const response = http.post('/user/getByUsername', null, {
            params: {
                userName: username,
                userPassword: password
            },
        });
        return response;
    } catch (error) {
        console.error("登录失败:", error);
        throw error;
    }
};
export const userinfo_updata = (userId: number, username: string, age: number, email: string, tel: string) => {
    try {
        const response = http.post('/user/update', {
            userId: userId,
            userName: username,
            userAge: age,
            userEmail: email,
            userTel: tel
        });
        return response;
    } catch (error) {
        console.log("用户信息更新失败", error);
        throw error;
    }
}
export const user_updatePassword = (userId: number, oldPassword: string, newPassword: string) => {
    try {
        const response = http.post('/user/updatePassword', {
            userId: userId,
            oldPassword: oldPassword,
            newPassword: newPassword
        });
        return response;
    } catch (error) {
        console.log("用户信息更新失败", error);
        throw error;
    }
}