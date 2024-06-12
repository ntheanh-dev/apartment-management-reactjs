import Login from "../pages/auth/Login"
import Home from "../pages/home/Home"
import Service from "../pages/services/Service"

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/service', component: Service },
    { path: '/login', component: Login, isNotDefault:true },
]

export { publicRoutes } 