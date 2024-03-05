import { createRouter, createWebHistory } from 'vue-router'

import PageAbout from '../views/PageAbout.vue'
import PageHome from '../views/PageHome.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: PageHome
},{
    path: '/about',
    name: 'About',
    component: PageAbout
}]

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })

export default router