import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Recips from "@/views/Recips.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/recips',
            name: 'recips',
            component: Recips
        }
    ],
})

export default router;