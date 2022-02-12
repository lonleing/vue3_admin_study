import {
    ElDialog,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElIcon,
    ElDrawer,
    ElRow,
    ElCol,
    ElScrollbar,
    ElTable,
    ElTableColumn,
    ElCard,
    ElButton,
    ElProgress,
    ElTimeline,
    ElTimelineItem,
    ElTag,
    ElForm,
    ElFormItem
} from 'element-plus'

import { App } from 'vue'
export default function loadComponent (app: App<Element>) {
    app.use(ElDialog)
    app.use(ElMenu)
    app.use(ElSubMenu)
    app.use(ElMenuItem)
    app.use(ElIcon)
    app.use(ElDrawer)
    app.use(ElRow)
    app.use(ElCol)
    app.use(ElScrollbar)
    app.use(ElTable)
    app.use(ElTableColumn)
    app.use(ElCard)
    app.use(ElButton)
    app.use(ElProgress)
    app.use(ElTimeline)
    app.use(ElTimelineItem)
    app.use(ElTag)
    app.use(ElForm)
    app.use(ElFormItem)
}

import './element.css'