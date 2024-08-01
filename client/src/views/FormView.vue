<script setup>
import { ref } from "vue"

const product = ref()
const ro = ref(false)

// 阻止键盘自动弹出
function fn() {
    ro.value = true
    setTimeout(() => {
        ro.value = false
    }, 50)
}

// onMounted(() => {
// getCurrentInstance().ctx.$refs.test.focus()
// })
</script>

<template>
    <div class="main">
        <h1>FORM</h1>
        <van-form>
            <van-field
                autofocus=""
                ref="test"
                v-model="product"
                label="条码"
                label-align="top"
                @focus="fn"
                :readonly="ro"
            />
        </van-form>
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
</style>
