<script setup>
import { userStore } from "@/store/userStore"

const store = userStore()
const username = sessionStorage.getItem("username")
const role = sessionStorage.getItem("role")

const onClick = async () => {
    sessionStorage.removeItem("username")
    store.resetAll()
    location.reload()
    window.location.href = "/"
}
</script>

<template>
    <div class="set">
        <!-- <h1>{{ username }}</h1> -->
        <van-cell-group inset class="cellgroup">
            <van-cell title="用户：" :value="username" />
            <van-cell title="权限：" :value="role" />
        </van-cell-group>
        <van-button class="button" type="primary" @click="onClick"
            >退出登录</van-button
        >
    </div>
</template>

<style scoped>
.set {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 120px);
}
.cellgroup {
    width: 60%;
    background-color: white;
}
.button {
    width: 30%;
    margin-top: 30px;
}
</style>
