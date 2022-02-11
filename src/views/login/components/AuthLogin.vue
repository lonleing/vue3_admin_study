<template>
  <div class="login_center_box">
    <h4>欢迎登陆</h4>
    <div class="login_centent_box">
      <login-input
        label="用户名"
        v-model="username"
        placeholder="请输入用户名"
        @enter="login"
      ></login-input>
      <login-input
        label="密码"
        v-model="password"
        placeholder="请输入密码"
        type="password"
        :maxLength="16"
        @enter="login"
      ></login-input>
      <div class="login_other_box">
        <label>
          <input type="checkbox" value="" hidden />
          <div></div>
          记住密码
        </label>
        <span class="to_forget_password" @click="toForgetPassword"
          >忘记密码</span
        >
      </div>
      <div style="margin-top: 30px">
        <login-button text="登录" @loginEvent="login"></login-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import LoginButton from './login-button/LoginButton.vue'
import LoginInput from './login-input/LoginInput.vue'
import { post } from '@/nets/request'
import { Http } from '@/nets/httpApi'
import { ElMessage } from 'element-plus'
import { setCommit } from '@/store'
import router from '@/router'
export default defineComponent({
  components: {
    LoginInput,
    LoginButton,
  },
  setup() {
    const username = ref('')
    const password = ref('')

    let isAdopt = true
    function checkData() {
      if (!username.value) {
        isAdopt = false
        ElMessage({
          message: '用户名不能为空',
          type: 'warning',
        })
      } else if (!password.value) {
        isAdopt = false
        ElMessage({
          message: '密码不能为空',
          type: 'warning',
        })
      } else {
        isAdopt = true
      }
    }

    function login() {
      checkData()
      if (isAdopt) {
        post(Http.Login, {
          username: username.value,
          password: password.value,
        }).then((data) => {
          const storeModule = 'userStore'
          setCommit(storeModule, 'setToken', data.token)
          setCommit(storeModule, 'setUserInfo', data)
          router.replace({ name: 'Dashboard' })
        })
      }
    }

    const toComponent = inject('toComponent') as (component: string) => void
    const toForgetPassword = () => {
      toComponent('ForgetPassword')
    }

    return {
      username,
      password,
      login,
      toForgetPassword,
    }
  },
})
</script>

<style lang="scss" scoped>
.login_center_box {
  width: 300px;
  border-radius: 10px;
  border: 1px solid #2d4986;
  padding: 30px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: relative;
  h4 {
    color: white;
    font-weight: initial;
    margin-bottom: 10px;
  }
  .login_centent_box {
    width: 100%;
    .login_other_box {
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-top: 10px;
      user-select: none;
      label {
        display: flex;
        align-items: center;
        div {
          border-radius: 50%;
          width: 15px;
          height: 15px;
          border: 1px solid white;
          margin-right: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        input:checked + div::before {
          content: '';
          border-radius: 50%;
          width: 72%;
          height: 72%;
          display: block;
          background-color: rgb(68, 118, 255);
        }
      }
      .to_forget_password {
        cursor: pointer;
        &:hover {
          color: #5fb5ff;
        }
      }
    }
  }
}
</style>