<script setup>
import { ref } from "vue"
import { userLogin } from "@/service/service"
import { userStore } from "@/store/userStore"
import router from "@/router"

const username = ref("123")
const password = ref("234")

const handleSubmit = async () => {
    try {
        const store = userStore()
        const response = await userLogin(username.value, password.value)
        store.setAccessToken(response.data.token)
        sessionStorage.setItem("username", username.value)
        sessionStorage.setItem("role", response.data.role)

        // 跳转主页
        router.push("/menu")
    } catch (error) {
        alert("登录失败：" + error.response.data)
    }
}
</script>

<template>
    <div class="login-container">
        <van-form @submit="handleSubmit">
            <van-cell-group inset class="card">
                <van-field
                    v-model="username"
                    name="用户名"
                    placeholder="请输入用户名"
                    label="用户名"
                    required
                    autocomplete="username"
                />
                <van-field
                    type="password"
                    v-model="password"
                    name="密码"
                    placeholder="请输入密码"
                    label="密码"
                    required
                    autocomplete="current-password"
                />
            </van-cell-group>
            <van-button
                class="button"
                type="primary"
                round
                block
                @click="handleSubmit"
            >
                登录
            </van-button>
        </van-form>
    </div>
</template>

<style scoped>
.login-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    width: 70%;
    margin: auto;
}
.button {
    margin: 30px auto;
    width: 30%;
}
</style>
