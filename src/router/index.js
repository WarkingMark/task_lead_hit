import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
// Routes
import IndexRoutes from "@/router/modules";


const routes = [
    ...IndexRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context
    })
})

export default router
