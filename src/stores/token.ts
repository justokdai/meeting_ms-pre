import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore('token', () => {
    const token = ref('');

    function setnull() {
        token.value = '';
    }

    return { token, setnull };
});
