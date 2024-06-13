import Login from '../pages/auth/Login';
import Cabinet from '../pages/cabinet';
import Chat from '../pages/chat';
import Home from '../pages/home/Home';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/cabinet', component: Cabinet },
    { path: '/login', component: Login, isNotDefault: true },
];

export { publicRoutes };
