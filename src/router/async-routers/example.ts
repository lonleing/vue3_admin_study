import { createRouter } from './base_router'
import List from '@/views/example/List.vue'
import { RouteRecordRaw } from 'vue-router'
import BasePage from '@/base/BasePage'

const ExampleRouter: RouteRecordRaw[] = [
    createRouter('/example', [
        {
            path: 'list',
            component: () => BasePage(List),
            name: 'ArticleList',
            meta: {
                title: 'articleList',
                requiresAuth: true
            }
        }
    ], {
        title: 'example',
        icon: 'HelpFilled'
    })
]

export default ExampleRouter