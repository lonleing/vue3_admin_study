<template>
    <div class="login_center_box">
        <div class="back" @click="backLogin">
            <svg viewBox="0 0 1024 1024" p-id="822" width="20" height="20">
                <path d="M663.296 104.704a21.333333 21.333333 0 0 1 30.165333 0l30.165334 30.165333a21.333333 21.333333 0 0 1 0 30.165334L331.434667 557.226667a21.333333 21.333333 0 0 1-30.165334 0l-30.165333-30.165334a21.333333 21.333333 0 0 1 0-30.165333l392.192-392.192z" p-id="823" fill="#dbdbdb"></path><path d="M663.296 104.704a21.333333 21.333333 0 0 1 30.165333 0l30.165334 30.165333a21.333333 21.333333 0 0 1 0 30.165334L331.434667 557.226667a21.333333 21.333333 0 0 1-30.165334 0l-30.165333-30.165334a21.333333 21.333333 0 0 1 0-30.165333l392.192-392.192z" p-id="824" fill="#dbdbdb"></path><path d="M723.626667 858.922667a21.333333 21.333333 0 0 1 0 30.165333l-30.165334 30.165333a21.333333 21.333333 0 0 1-30.165333 0l-392.192-392.192a21.333333 21.333333 0 0 1 0-30.165333l30.165333-30.165333a21.333333 21.333333 0 0 1 30.165334 0l392.192 392.192z" p-id="825" fill="#dbdbdb"></path><path d="M723.626667 858.922667a21.333333 21.333333 0 0 1 0 30.165333l-30.165334 30.165333a21.333333 21.333333 0 0 1-30.165333 0l-392.192-392.192a21.333333 21.333333 0 0 1 0-30.165333l30.165333-30.165333a21.333333 21.333333 0 0 1 30.165334 0l392.192 392.192z" p-id="826" fill="#dbdbdb"></path>
            </svg>
        </div>
        <h4>忘记密码</h4>
        <div class="login_centent_box">
            <login-input label="手机" placeholder="请输入11位数手机号码"></login-input>
            <div class="code_box">
                <login-input label="验证码" placeholder="请输入验证码"></login-input>
                <login-button text="获取验证码" customClass="get_code"></login-button>
            </div>
            <login-input label="新密码" placeholder="请输入新密码"></login-input>
            <login-input label="确认密码" placeholder="请再次输入新密码"></login-input>
            <div style="margin-top: 30px">
                <login-button text="确认修改"></login-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue"
import LoginInput from './login-input/LoginInput.vue'
import LoginButton from './login-button/LoginButton.vue'
export default defineComponent({
    components: {
        LoginInput,
        LoginButton
    },
    setup () {
        const toComponent = inject('toComponent') as (component: string) => void
        const backLogin = () => {
            toComponent('AuthLogin')
        }
        return {
            backLogin
        }
    }
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
        .code_box {
            display: flex;
            align-items: flex-end;
            .get_code {
                margin-left: 10px;
                flex-shrink: 0;
            }
        }
    }
    .back {
        color: white;
        font-size: 18px;
        position: absolute;
        left: 0;
        top: 25px;
        padding: 5px;
        padding-bottom: 0;
        cursor: pointer;
        user-select: none;
    }
}
</style>