import { createRouter, createWebHistory } from "vue-router";
// 引入组件
import AboutUs from "@/views/mainAboutUs.vue";
import Approval from "@/views/mainApproval.vue";
import Index from "@/views/mainIndex.vue";
import Rental from "@/views/mainRental.vue";
//创建路由器
const router = createRouter({
    history: createWebHistory(),//路由的工作模式
    routes: [//路由规则
        {
            path: '/',
            component: Index
        },
        {
            path: '/index',
            component: Index
        },
        {
            path: '/rental',
            component: Rental
        },
        {
            path: '/approval',
            component: Approval
        },
        {
            path: '/aboutus',
            component: AboutUs
        }
    ]
});
//暴露出router
export default router;

