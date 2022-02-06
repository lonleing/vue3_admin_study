<template>
    <el-card
        class="card"
        shadow="never"
    >
        <div class="depend_header">
            <span>依赖信息</span>
            <span>部署时间: {{ deployTime }}</span>
        </div>
        <div class="depend_link">
            <a v-for="item, index in dependLinks" :key="'dependLink'+index" :href="item.href" target="_blank">
                <el-button :type="item.button_type">{{ item.text }}</el-button>
            </a>
        </div>
        <el-table
            :data="dependTableData"
            :border="true"
            :show-header="false"
            row-class-name="depend_tabel_part_tr"
            cell-class-name="depend_tabel_part_td"
        >
            <el-table-column prop="names" :formatter="singleTdFormat" />
            <el-table-column prop="versions" :formatter="singleTdFormat" />
            <el-table-column prop="names" :formatter="doubleTdFormat" />
            <el-table-column prop="versions" :formatter="doubleTdFormat" />
        </el-table>
    </el-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { dependencies, devDependencies } from '../../../../../package.json'

export default defineComponent({
    setup() {
        const deployTime = process.env.VUE_APP_UPDATE_TIME

        const dependLinks = [
            {
                href: 'https://github.com/vuejs/vue-next',
                button_type: 'success',
                text: 'vue3.x'
            },
            {
                href: 'https://element-plus.gitee.io/#/zh-CN',
                button_type: 'primary',
                text: 'element-plus'
            },
            // {
            //     href: 'https://github.com/koajs/koa',
            //     button_type: 'info',
            //     text: 'koa2.x'
            // },
            {
                href: 'https://github.com/apache/echarts',
                button_type: 'danger',
                text: 'echarts5'
            },
            // {
            //     href: 'https://github.com/intlify/vue-i18n-next',
            //     button_type: 'warning',
            //     text: 'vue-i18n-next'
            // },
            {
                href: 'https://www.typescriptlang.org/docs/handbook/intro.html',
                button_type: 'primary',
                text: 'ts4.x'
            }
        ]

        const dependTableData = [
            {
                names: [
                    '@vue/cli版本',
                    'vue版本'
                ],
                versions: [
                    devDependencies["@vue/cli-service"],
                    dependencies["vue"]
                ]
            },
            {
                names: [
                    'vue-router版本',
                    'vuex版本'
                ],
                versions: [
                    dependencies["vue-router"],
                    dependencies["vuex"]
                ]
            },
            // {
            //     names: [
            //         'faker版本',
            //         'koa-body版本'
            //     ],
            //     versions: [
            //         dependencies["faker"],
            //         dependencies["koa-body"]
            //     ]
            // },
            // {
            //     names: [
            //         'lodash版本',
            //         'normalize版本'
            //     ],
            //     versions: [
            //         dependencies["lodash"],
            //         dependencies["normalize.css"]
            //     ]
            // },
            // {
            //     names: [
            //         'dotenv-cli版本',
            //         'concurrently版本'
            //     ],
            //     versions: [
            //         devDependencies["dotenv-cli"],
            //         devDependencies["concurrently"]
            //     ]
            // },
            {
                names: [
                    'eslint版本',
                    'sass版本'
                ],
                versions: [
                    devDependencies["eslint"],
                    devDependencies["sass"]
                ]
            },
            {
                names: [
                    'style-resources-loader版本',
                    'typescript版本'
                ],
                versions: [
                    devDependencies["style-resources-loader"],
                    devDependencies["typescript"]
                ]
            }
        ]

        function singleTdFormat(row: any, column: any, cellValue: any) {  // eslint-disable-line
            return cellValue[0]
        }

        function doubleTdFormat(row: any, column: any, cellValue: any) {  // eslint-disable-line
            return cellValue[1]
        }
        return {
            deployTime,
            dependLinks,
            dependTableData,
            singleTdFormat,
            doubleTdFormat
        }
    }
})
</script>
<style lang="scss" scoped>
.card {
    border-radius: 8px;
    .depend_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    .depend_link {
        margin-bottom: 15px;
        a {
            margin-right: 10px;
            margin-bottom: 5px;
            display: inline-block;
            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>
<style lang="scss">
    .depend_tabel_part_td:nth-child(2n-1) {
        background: #f7f7f7!important;
    }
    .depend_tabel_part_tr {
        --el-table-row-hover-bg-color: transparent;
        --el-table-border: 1px solid #e6e6e6;
    }
</style>
