import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

interface Meta {
    [x: string]: string|boolean
}

export function createRouter(path: string, children: RouteRecordRaw|RouteRecordRaw[], meta: Meta = {}) {
    if (!(children instanceof Array)) {
        children = [children]
        meta['onlyOne'] = true
    }

    return {
        path: path,
        component: Layout,
        meta: {
            ...meta
        },
        children: children
    }
}