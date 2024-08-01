<script setup>
import { ref } from "vue"
import { userRegister } from "@/service/service"
import { showFailToast, showSuccessToast } from "vant"
import "vant/es/toast/style"

const username = ref("")
const password = ref("")
const role = ref("")

const showPicker = ref(false)
const columns = [
    { text: "管理员", value: "admin" },
    { text: "用户", value: "user" },
]

const onConfirm = ({ selectedOptions }) => {
    role.value = selectedOptions[0]?.text
    showPicker.value = false
}

const handleSubmit = async () => {
    try {
        const response = await userRegister(
            username.value,
            password.value,
            role.value == "管理员" ? "admin" : "user"
        )

        showSuccessToast({
            message: response.data,
            forbidClick: true,
            overlay: true,
            duration: 1000,
        })
        setTimeout(() => {
            location.reload()
        }, 1000)
    } catch (error) {
        showFailToast({
            message: "注册失败：" + error.response.data,
            forbidClick: true,
            overlay: true,
            duration: 1000,
        })
        setTimeout(() => {
            location.reload()
        }, 1000)
    }
}
</script>

<template>
    <div class="login-container">
        <h1 class="title">注册新用户</h1>
        <van-form @submit="handleSubmit">
            <van-cell-group inset class="card">
                <van-field
                    v-model="username"
                    name="用户名"
                    placeholder="请输入用户名"
                    label="用户名"
                    autocomplete="username"
                    required
                />
                <van-field
                    type="password"
                    v-model="password"
                    name="密码"
                    placeholder="请输入密码"
                    label="密码"
                    autocomplete="current-password"
                    required
                />
                <van-field
                    v-model="role"
                    is-link
                    readonly
                    name="picker"
                    label="权限"
                    placeholder="请选择"
                    @click="showPicker = true"
                    required
                />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-picker
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="showPicker = false"
                    />
                </van-popup>
            </van-cell-group>
            <van-button
                class="button"
                type="primary"
                round
                block
                @click="handleSubmit"
            >
                提交
            </van-button>
        </van-form>
    </div>
</template>

<style scoped>
.title {
    margin: 50px;
}
.login-container {
    height: calc(100vh - 120px);
    width: 100vw;
    display: flex;
    flex-direction: column;
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
