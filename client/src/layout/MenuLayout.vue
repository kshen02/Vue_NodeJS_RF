<script setup lang="ts">
import BottomBar from "./components/BottomBar.vue"
import TitleNav from "./components/TitleNav.vue"
</script>

<template>
    <div class="container">
        <header class="header">
            <TitleNav />
        </header>
        <main class="main">
            <RouterView />
        </main>
        <footer class="footer">
            <BottomBar />
        </footer>
    </div>
</template>

<style scoped>
.container {
    overflow: auto;
}
.header {
    position: fixed;
    z-index: 100;
}
.main {
    position: relative;
    z-index: 1;
    margin-top: 60px;
    /* padding-top: 30px; */
    height: calc(100vh - 120px);
    /* border: 1px solid red; */
}
.footer {
    position: fixed;
    z-index: 100;
}
</style>
