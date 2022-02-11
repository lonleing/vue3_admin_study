import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

interface Meta {
    [x: string]: string
}

export function createRouter(path: string, meta: Meta = {}, children: RouteRecordRaw[] = []) {
    return {
        path: path,
        component: Layout,
        meta: {
            ...meta
        },
        children: children
    }
}