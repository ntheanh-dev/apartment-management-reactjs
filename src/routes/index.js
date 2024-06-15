import Login from '../pages/auth/Login';
import Cabinet from '../pages/cabinet';
import Chat from '../pages/chat';
import Home from '../pages/home/Home';
import Relative from '../pages/relatives';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/cabinet', component: Cabinet },
    { path: '/relatives', component: Relative },
    { path: '/login', component: Login, isNotDefault: true },
];

export { publicRoutes };
