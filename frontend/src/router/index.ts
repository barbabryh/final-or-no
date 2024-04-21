import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('../pages/LoginPage.vue'),
	},
	{
		path: '/profile',
		component: () => import('../pages/ProfilePage1.vue'),
	},
	{
		path: '/main',
		component: () => import('../pages/MainPage1.vue'),
	}
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(to => {
	console.log(to);
});
