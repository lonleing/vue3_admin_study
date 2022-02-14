import { createRouter } from './base_router'
import List from '@/views/example/List.vue'
import { RouteRecordRaw } from 'vue-router'
import BasePage from '@/base/BasePage'
import Edit from '@/views/example/Edit.vue'

const ExampleRouter: RouteRecordRaw[] = [
    createRouter('/example', [
        {
            path: 'create',
            component: () => BasePage(Edit),
            name: 'ArticleCreate',
            meta: {
                title: 'createArticle'
            }
        },
        {
            path: 'edit/:id',
            component: () => BasePage(Edit),
            name: 'ArticleEdit',
            meta: {
                hidden: true,
                activeMenu: '/example/list'
            }
        },
        {
            path: 'list',
            component: () => BasePage(List),
            name: 'ArticleList',
            meta: {
                title: 'articleList',
            }
        }
    ], {
        title: 'example',
        icon: 'HelpFilled',
        requiresAuth: true
    })
]

export default ExampleRouter