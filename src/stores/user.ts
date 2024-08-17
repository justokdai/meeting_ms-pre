import { defineStore } from "pinia";
import { reactive } from "vue";
export const useUserStore = defineStore('UserINfo', () => {
    //真正存储数据的地方
    const user = reactive({
        user_id: -1,
        user_name: '',
        user_age: -1,
        user_email: '',
        user_tel: '',
    });
    function login_out() {
        user.user_id = -1;
        user.user_name = '';
        user.user_age = -1;
        user.user_email = '';
        user.user_tel = ''
    }
    function update(user_name: string, user_age: number, user_email: string, user_tel: string) {
        user.user_name = user_name;
        user.user_age = user_age;
        user.user_email = user_email;
        user.user_tel = user_tel;
    }
    return { user, login_out, update };
});