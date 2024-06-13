import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './components/common/DefaultLayout';
import { publicRoutes } from './routes';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.isNotDefault ? (
                                    <Page />
                                ) : (
                                    <Layout>
                                        <Page />
                                    </Layout>
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
