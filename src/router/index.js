import Vue from 'vue'
import VueRouter from 'vue-router'
import StaffCatalog from "../views/StaffCatalog";
import ProfilePage from "../views/ProfilePage";
import NotFoundPage from "../views/NotFoundPage";


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name:'root',
        component: StaffCatalog,
        props: true
    },
    {
        path: '/profile',
        name:'profile',
        component: () => import(/*webpackChunkName: profile*/'../views/ProfilePage.vue'),
        props: true
    },
    {
        path: '*',
        name:'notFound',
        component: NotFoundPage
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router