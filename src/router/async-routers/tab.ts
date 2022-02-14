import BasePage from "@/base/BasePage";
import { RouteRecordRaw } from "vue-router";
import { createRouter } from "./base_router";
import Tab from '@/views/tab/Tab.vue'

const TabRouter: RouteRecordRaw[] = [
    createRouter('/', {
        path: 'tab',
        component: () => BasePage(Tab),
        name: 'Tab'
    }, {
        title: 'tab',
        icon: 'List',
        requiresAuth: true
    })
]

export default TabRouter