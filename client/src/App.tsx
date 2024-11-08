import { Hero } from './components/Hero.tsx';
import { TechStack } from './components/TechStack.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router-dom";
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import QuotesPages from './pages/Dashboard/QuotesPages/Base.tsx';
import { useEffect } from "react";
import { LayoutDash } from "./pages/Dashboard/Layout";
import { submit } from './lib/api/AuthService/Refresh';


function BaseLayout() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-800 to-violet-950">
                <div className="container mx-auto px-4 py-8">
                    {!window.location.pathname.startsWith('/dashboard') && <Navbar />}
                    <div className="container mx-auto px-4 py-16 flex justify-center">
                        <Outlet />
                    </div>
                </div>
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
                    if("token" in data && "refreshToken" in data) {
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