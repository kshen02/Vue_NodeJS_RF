import { ref } from "vue"
import router from "./router"
import { userStore } from "./store/userStore"

const added = ref(false)

function addDynamicRoute(to, routes) {
    for (let route of routes) {
        let to_path = (to + route.path).replace(/\/+/g, "/")
        router.addRoute("menulayout", {
            path: to_path,
            name: route.name,
            component: () => import(`@/views/${route.component}.vue`),
            meta: route.meta,
        })
        if (route.children) {
            addDynamicRoute(to_path, route.children)
        }
    }
}

async function initRouter() {
    const store = userStore()
    await store.getRoutes()
    const routes = store.findSubRoutes("/menu".replace(/^.*(?=\/[^/]*$)/, ""))
    addDynamicRoute("/menu", routes)
    added.value = true
    // console.log("Added new routes after refresh")
}

router.beforeEach(async (to, from, next) => {
    // 不是登录页 && 动态路由未添加 && 刷新了
    if (!to.meta.noAuth && !added.value && !from.name) {
        // console.log("页面刷新了")
        await initRouter()
        next({ path: to.path, replace: true })
    } else if (to.meta.noAuth) {
        // 登录页
        added.value = false
        next()
    } else if (!to.meta.noAuth && !added.value) {
        // 不是登录页，且路由未添加
        await initRouter()
        next()
    } else {
        console.log("routes: ", router.getRoutes())
        next()
    }
})

// router.afterEach(() => {
//     console.log("Added: ", added.value)
// })
