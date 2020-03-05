import Vue from 'vue'
import VueRouter from 'vue-router'

const login=()=>import('views/login.vue')
const Home=()=>import('views/Home.vue')
Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		redirect:'/login'
	},
	{
	path:'/login',
	component : login
	},
	{
		path:'/Home',
		component : Home
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
	if(to.path==='/login') return next()
	//获取token
	const token=window.sessionStorage.getItem('token')
	if(!token) return next('/login')
	return next()
})
export default router
