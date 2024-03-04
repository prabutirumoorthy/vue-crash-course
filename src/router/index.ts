import { createRouter, createWebHistory } from 'vue-router'

import PageAbout from '../views/PageAbout.vue'

const routes = [{
    path: '/about',
    name: 'About',
    component: PageAbout
}]

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })

export default router