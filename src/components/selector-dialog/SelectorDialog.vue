<template>
    <teleport to="#__base_popup__">
        <el-dialog :custom-class="customClass" v-model="show" :title="title" :top="top" :width="width" :show-close="showClose" :center="center" :modal="modal" @close="colse">
            <div class="select_dialog_item" v-for="item,key in list" :key="`select_dialog_${key}`" :class="{ active: key === activeVal }" @click="optionsTap(key)">{{ item }}</div>
        </el-dialog>
    </teleport>
</template>

<script lang="ts">
import {  computed, defineComponent, ref } from 'vue'
export default defineComponent({
    props: {
        list: {
            type: Object,
            default: (function () {
                return {}
            })()
        },
        active: {
            type: String,
            default: ''
        },
        isShow: {
            type: Boolean
        },
        isHeader: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: '选择主题'
        },
        showClose: {
            type: Boolean,
            default: false
        },
        top: {
            type: String,
            default: '50vh'
        },
        width: {
            type: [String, Number],
            default: '74%'
        },
        center: {
            type: Boolean,
            default: true
        },
        modal: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:isShow', 'optionTap'],
    setup (props, { emit }) {
        const customClass = props.isHeader ? '__showHeader__' : '__selector_dialog__'
        let show = computed({
            get: () => props.isShow,
            set: val => val
        })
        const colse = () => {
            emit('update:isShow', false)
        }
        let activeVal = ref(props.active)
        const optionsTap = (val: string) => {
            activeVal.value = val
            emit('optionTap', val)
        }
        return {
            activeVal,
            show,
            customClass,
            colse,
            optionsTap
        }
    }
})
</script>

<style lang="scss" scoped>
.select_dialog_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    padding: 18px 0;
    font-size: 16px;
    &.active {
        color: rgb(119, 255, 137);
        &::after {
            content: '';
            display: block;
            border: 2px solid rgb(119, 255, 137) {
                left: none;
                top: none;
            };
            width: 6px;
            height: 14px;
            transform: rotateZ(45deg) translateX(-8px) translateY(8px);
        }
    }
    &:last-child {
        border-bottom: none;
    }
}
</style>

<style lang="scss">
.__showHeader__ {
    transform: translateY(-50%);
    --el-border-radius-small: 10px;
    --el-dialog-padding-primary: 15px;
    .el-dialog__header {
        border-bottom: 1px solid #f2f2f2;
    }
    .el-dialog__body {
        padding-top: 0;
        padding-bottom: 0;
    }
    &.el-dialog--center .el-dialog__body {
        padding-top: 0;
        padding-bottom: 0;
    }
}
.__selector_dialog__ {
    transform: translateY(-50%);
    --el-border-radius-small: 10px;
    --el-dialog-padding-primary: 15px;
    .el-dialog__header {
        display: none;
    }
    .el-dialog__body {
        padding-top: 0;
        padding-bottom: 0;
    }
    &.el-dialog--center .el-dialog__body {
        padding-top: 0;
        padding-bottom: 0;
    }
}
</style>