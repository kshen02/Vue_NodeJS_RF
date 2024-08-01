import { createRouter, createWebHistory } from "vue-router"
import LoginLayout from "@/layout/LoginLayout.vue"
import MenuLayout from "@/layout/MenuLayout.vue"
import LoginView from "@/views/LoginView.vue"
import MenuView from "@/views/MenuView.vue"
import SettingsView from "@/views/SettingsView.vue"
import PageNotExist from "@/views/Exception/PageNotExist.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: LoginLayout,
            children: [
                {
                    path: "",
                    name: "login",
                    component: LoginView,
                    meta: {
                        noAuth: true,
                    },
                },
            ],
        },
        {
            path: "/menu",
            name: "menulayout",
            component: MenuLayout,
            children: [
                {
                    path: "",
                    name: "menu",
                    component: MenuView,
                },
            ],
        },
        {
            path: "/settings",
            component: MenuLayout,
            children: [
                {
                    path: "",
                    name: "settings",
                    component: SettingsView,
                },
            ],
        },
        {
            hide: true,
            path: "/:pathMatch(.*)*",
            component: PageNotExist,
        },
    ],
})

export default router
