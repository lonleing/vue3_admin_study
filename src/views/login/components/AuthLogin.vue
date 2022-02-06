<template>
    <div class="login_center_box">
        <h4>欢迎登陆</h4>
        <div class="login_centent_box">
            <login-input label="用户名" v-model="user_name" placeholder="请输入用户名"></login-input>
            <login-input label="密码" placeholder="请输入密码" type="password" :maxLength="16"></login-input>
            <div class="login_other_box">
                <label>
                    <input type="checkbox" value="" hidden />
                    <div></div>记住密码
                </label>
                <span class="to_forget_password" @click="toForgetPassword">忘记密码</span>
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
export default defineComponent({
    components: {
        LoginInput,
        LoginButton
    },
    setup() {
        const user_name = ref('11111')
        function login() {
            console.log(user_name.value)
        }
        const toComponent = inject('toComponent') as (component: string) => void
        const toForgetPassword = () => {
            toComponent('ForgetPassword')
        }
        return {
            user_name,
            login,
            toForgetPassword
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
                    color: #5fb5ff
                }
            }
        }
    }
}
</style>