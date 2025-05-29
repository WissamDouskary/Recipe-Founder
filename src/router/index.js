import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Recips from "@/views/Recips.vue";
import Recip from "@/views/Recip.vue";

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
        },
        {
            path: '/recips/:id',
            name: 'recip',
            component: Recip
        }
    ],
})

export default router;