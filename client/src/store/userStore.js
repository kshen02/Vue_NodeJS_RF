import { loadRoutes } from "@/service/service"
import { defineStore } from "pinia"

export const userStore = defineStore("user", {
    state: () => {
        return {
            AccessToken: "",
            // RefreshToken: "",
            Routes: [],
        }
    },
    getters: {
        getAccessToken() {
            return this.AccessToken
        },
    },
    actions: {
        setAccessToken(token) {
            this.AccessToken = token
        },
        resetAll() {
            this.AccessToken = ""
            this.Routes = []
        },
        resetRoutes() {
            this.Routes = []
        },
        async getRoutes() {
            if (this.Routes.length == 0) {
                this.Routes = (await loadRoutes()).data
            }
            return this.Routes
        },
        findSubRoutes(target, routes = this.Routes) {
            for (let route of routes) {
                if (route.path == target) {
                    return route.children
                } else if (route.children) {
                    const found = this.findSubRoutes(target, route.children)
                    if (found) {
                        return found
                    }
                }
            }
            return undefined
        },
    },
    persist: {
        enabled: true,
    },
})
