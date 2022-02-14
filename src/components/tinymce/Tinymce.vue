<template>
    <tinymce-editor  v-model="con" :disabled="false" :init="init" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import TinymceEditor from '@tinymce/tinymce-vue'
import 'tinymce'
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/themes/mobile'

export default defineComponent({
    components: {
        TinymceEditor 
    },
    props: {
        content: {
            type: String,
            default: ''
        }
    },
    setup(_) {
        const content = computed(() => _.content)

        const con = ref(_.content)
        watch(content, (newVal)=> {
            con.value = newVal
        })

        const init = {
            language_url: '/tinymce/langs/zh_CN.js',  // 语言包路径
            language: 'zh_CN',  // 语言
            skin_url: '/tinymce/skins/',  // skin路径
            height: 400,  // 编辑器高度
            branding: false,  // 是否禁用“Powered by TinyMCE”
            menubar: false,  // 顶部菜单栏显示
        }

        return {
            con,
            init
        }
    },
})
</script>
