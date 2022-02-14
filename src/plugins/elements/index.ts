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
    ElFormItem,
    ElInput,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElRadio,
    ElRadioGroup,
    ElCheckboxGroup,
    ElCheckbox,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElRate,
    ElTabs,
    ElTabPane
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
    app.use(ElInput)
    app.use(ElDropdown),
    app.use(ElDropdownMenu)
    app.use(ElDropdownItem)
    app.use(ElRadio)
    app.use(ElRadioGroup)
    app.use(ElCheckboxGroup)
    app.use(ElCheckbox)
    app.use(ElSelect)
    app.use(ElOption)
    app.use(ElDatePicker)
    app.use(ElRate)
    app.use(ElTabs)
    app.use(ElTabPane)
}

import './element.css'