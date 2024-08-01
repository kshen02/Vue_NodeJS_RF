<script setup>
import { ref } from "vue"
import { loadUsers } from "@/service/service"

async function initList() {
    users.value = (await loadUsers()).data
    console.log(users.value)
}

const users = ref([])
initList()
</script>

<template>
    <div class="main">
        <van-list>
            <van-cell
                v-for="user in users"
                :key="user.id"
                :title="'用户：' + user.username"
                :value="'权限：' + user.role"
                value-class="value-class"
            />
        </van-list>
    </div>
</template>

<style scoped>
.main {
    width: 80%;
    padding-top: 30px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: left;
}
.value-class {
    align-items: right;
}
</style>
