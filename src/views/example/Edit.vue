<template>
  <el-form>
    <sticky>
      <div class="sticky-item-box">
        <comment-dropdown :value="!data.isComment" />
      </div>
      <div class="sticky-item-box">
        <platform-dropdown :value="data.platform" />
      </div>
      <div class="sticky-item-box">
        <el-button
          :loading="publishLoading"
          type="success"
          @click="submitForm"
          style="margin-left: 10px"
          >Publish</el-button
        >
      </div>
      <div class="sticky-item-box">
        <el-button
          :loading="draftLoading"
          type="warning"
          @click="draftForm"
          style="margin-left: 10px"
          >Draft</el-button
        >
      </div>
    </sticky>
    <div class="createPost-main-container">
      <material-input v-model="data.title" text="Title" required />
      <div style="margin-top: 50px">
        <el-row>
          <el-col :lg="8" :span="24">
            <el-form-item label="Author:" style="font-weight: 700">
              <el-select
                remote
                filterable
                default-first-option
                placeholder="Search user"
                :remote-method="remoteMethod"
                :loading="selectLoading"
                v-model="data.author"
              >
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :span="24">
            <el-form-item label="Publish Time:" style="font-weight: 700">
              <el-date-picker v-model="data.date" type="datetime" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :span="24">
            <el-form-item label="Importance" style="font-weight: 700">
              <el-rate
                v-model="data.importance"
                :max="3"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                :low-threshold="1"
                :high-threshold="3"
                style="display: inline-block"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Describe:" style="font-weight: 700">
          <el-input
            :rows="1"
            autosize
            type="textarea"
            placeholder="Please enter the content"
            class="article-textarea"
            style="font-size: 16px"
            v-model="data.describe"
          />
          <span class="word-counter">{{ data.describe.length }}words</span>
        </el-form-item>
        <el-form-item>
          <tinymce :height="400" :content="data.content" />
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import Sticky from './components/Sticky.vue'
import CommentDropdown from './components/CommentDropdown.vue'
import PlatformDropdown from './components/PlatformDropdown.vue'
import MaterialInput from '@/components/material-input/MaterialInput.vue'
import Tinymce from '@/components/tinymce/Tinymce.vue'
import { get } from '@/nets/request'
import { Http } from '@/nets/httpApi'

export default defineComponent({
  components: {
    Sticky,
    CommentDropdown,
    PlatformDropdown,
    MaterialInput,
    Tinymce,
  },
  async setup() {
    const data = reactive({
      title: '',
      author: '',
      date: '',
      importance: 0,
      content: '',
      describe: '',
      platform: [],
      isComment: true
    })
    const route = useRoute()
    const { params } = route

    const publishLoading = ref(false)
    const draftLoading = ref(false)

    // 仿远程搜索数据
    const states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ]
    interface ListItem {
      value: string
      label: string
    }
    const options = ref<ListItem[]>([])
    const selectLoading = ref(false)
    const list = ref<ListItem[]>([])
    onMounted(() => {
      list.value = states.map((item) => {
        return { value: `value:${item}`, label: item }
      })
    })
    const remoteMethod = (query: string) => {
      if (query) {
        selectLoading.value = true
        setTimeout(() => {
          selectLoading.value = false
          options.value = list.value.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        options.value = []
      }
    }

    if (params.id !== undefined) {
      const id = params.id
      await get(Http.ArticleInfo, {
        id: id,
      }).then((res) => {
          console.log(res)
        data.title = res.title
        data.author = res.author
        data.date = res.date
        data.importance = res.importance
        data.content = res.content
        data.describe = res.describe
        data.platform = res.platform
        data.isComment = res.isComment
      })
    }

    const submitForm = () => {
      // 发布
      console.log('submit')
      publishLoading.value = true
      setTimeout(() => {
          publishLoading.value = false
      }, 500)
    }

    const draftForm = () => {
      //草稿箱
      console.log('draft')
      draftLoading.value = true
      setTimeout(() => {
          draftLoading.value = false
      }, 500)
    }

    return {
      data,
      publishLoading,
      draftLoading,
      selectLoading,
      options,
      submitForm,
      draftForm,
      remoteMethod,
    }
  },
})
</script>

<style lang="scss" scoped>
.sticky-item-box {
  padding: 7px 0;
}
.createPost-main-container {
  padding: 40px 45px 20px 50px;
}
.word-counter {
  width: 40px;
  position: absolute;
  right: 10px;
  top: 0;
  font-weight: 400;
}
</style>
<style lang="scss" >
.article-textarea textarea {
  padding-right: 40px;
  resize: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #bfcbd9;
  background: transparent;
}
</style>
