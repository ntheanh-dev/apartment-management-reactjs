import Login from '../pages/auth/Login';
import Chat from '../pages/chat';
import Home from '../pages/home/Home';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/login', component: Login, isNotDefault: true },
];

export { publicRoutes };
