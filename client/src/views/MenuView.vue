<script setup>
import router from "@/router"
import { userStore } from "@/store/userStore"
import { onBeforeMount, onUpdated, ref } from "vue"

const routes = ref()
const store = userStore()
// const is_admin = sessionStorage.getItem("group") == "admin"

onBeforeMount(() => {
    const current_node = router.currentRoute._value.path.replace(
        /^.*(?=\/[^/]*$)/,
        ""
    )
    routes.value = store.findSubRoutes(current_node)
})

onUpdated(() => {
    const current_node = router.currentRoute._value.path.replace(
        /^.*(?=\/[^/]*$)/,
        ""
    )
    routes.value = store.findSubRoutes(current_node)
})
</script>

<template>
    <div class="menu">
        <van-grid :column-num="2" :gutter="30" center square clickable>
            <van-grid-item
                v-for="route in routes"
                :key="route.name"
                :icon="route.meta.icon"
                :text="route.meta.title"
                :to="$route.path + route.path"
            />
            <!-- <van-grid-item
                v-if="is_admin && router.currentRoute._value.path == '/menu'"
                key="admin"
                icon="manager-o"
                text="管理员菜单"
                to="/admin"
            /> -->
        </van-grid>
    </div>
</template>

<style>
.menu {
    padding-top: 30px;
}
</style>
