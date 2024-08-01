import { http, HttpResponse } from "msw"
import { menuList, submenuList } from "./mockData"

export const handlers = [
    http.get("https://example.com/menu/", () => {
        return HttpResponse.json(menuList)
    }),
    http.get("https://example.com/menu/menu_1", () => {
        return HttpResponse.json(submenuList)
    }),
]
