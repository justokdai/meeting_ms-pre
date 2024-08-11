import { defineStore } from "pinia";
export const useUserStore = defineStore('UserINfo', () => {
    //真正存储数据的地方
    const user = {
        user_id: '',
        user_name: '',
        user_password: '',
        user_age: 0,
        user_email: '',
        user_tel: '',
    };
    function login_out() {
        user.user_id = '';
        user.user_name = '';
        user.user_password = '';
        user.user_age = 0;
        user.user_email = '';
        user.user_tel = ''
    }

    return { user, login_out };
});