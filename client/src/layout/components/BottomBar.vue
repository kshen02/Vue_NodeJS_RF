<script setup>
import { ref } from "vue"

const active = ref(0)
</script>

<template>
    <div class="bott-nav">
        <van-tabbar v-model="active">
            <van-tabbar-item to="/menu" icon="wap-home-o">菜单</van-tabbar-item>
            <van-tabbar-item to="/settings" icon="setting-o"
                >设置</van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>

<style scoped>
.bott-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    --van-tabbar-height: 60px;
}
.bott-icon {
    margin-inline: 20vw;
}
</style>
