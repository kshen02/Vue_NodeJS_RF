<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const onClickLeft = () => router.back()
</script>

<template>
    <div class="nav">
        <van-nav-bar
            v-if="$route.path == '/menu' || $route.path == '/settings'"
            z-index="100"
            title="标题"
        />
        <van-nav-bar v-else title="标题" left-arrow @click-left="onClickLeft" />
    </div>
</template>

<style scoped>
.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    --van-nav-bar-background: var(--van-primary-color);
    --van-nav-bar-height: 60px;
    --van-nav-bar-title-text-color: white;
    --van-nav-bar-text-color: white;
    --van-nav-bar-icon-color: white;
    --van-nav-bar-arrow-size: 24px;
}
</style>
