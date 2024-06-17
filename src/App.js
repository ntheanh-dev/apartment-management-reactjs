import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './components/common/DefaultLayout';
import { publicRoutes } from './routes';
import PrivateRoute from './routes/PrivateRoute';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = DefaultLayout;
                    const Page = route.component;

                    let Ele = route.isNotDefault ? (
                        <Page />
                    ) : (
                        <Layout>
                            <Page />
                        </Layout>
                    );

                    if (route.path !== '/login') {
                        Ele = <PrivateRoute>{Ele}</PrivateRoute>;
                    }
                    return <Route key={index} path={route.path} element={Ele} />;
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
