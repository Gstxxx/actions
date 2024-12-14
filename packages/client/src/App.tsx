import { Hero } from './components/Hero.tsx';
import { TechStack } from './components/TechStack.tsx';
import { Footer } from './components/Footer.tsx';
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router-dom";
import LoginForm from './pages/Auth/LoginForm.tsx';
import RegisterForm from './pages/Auth/RegisterForm.tsx';
import QuotesPages from './pages/Dashboard/QuotesPages/Base.tsx';
import { useEffect } from "react";
import { LayoutDash } from "./pages/Dashboard/Layout.tsx";
import { submit } from './lib/api/AuthService/Refresh.ts';


function BaseLayout() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-800 to-violet-950">
                <Outlet />
            </div>
        </>
    );
}

function Home() {
    return (
        <>
            <div>
                <main>
                    <Hero />
                    <TechStack />
                </main>
                <Footer />
            </div>

        </>
    );
}

const BaseLayoutDash = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const refreshAuthToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/login");
                    return;
                }

                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(window.atob(base64));
                const expirationTime = payload.exp * 1000;

                if (Date.now() >= expirationTime) {
                    const response = await submit();
                    const data = await response.json();
                    if ("token" in data && "refreshToken" in data) {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("refreshToken", data.refreshToken);
                        window.location.reload();
                    }
                    else {
                        navigate("/login");
                    }
                }
            } catch (error) {
                navigate("/login");
            }
        };

        refreshAuthToken();
    }, [navigate]);

    return (
        <>
            <LayoutDash />
        </>
    );
};

const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <LoginForm />,
            },
            {
                path: "/register",
                element: <RegisterForm />,
            },
            {
                path: "/dashboard",
                element: <BaseLayoutDash />,
                children: [
                    {
                        path: "/dashboard/quotes",
                        element: <QuotesPages />,
                    },
                ],
            },
        ],

    },
]);

const App = () => <RouterProvider router={router} />;

export default App;