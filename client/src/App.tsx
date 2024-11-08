import { Hero } from './components/Hero.tsx';
import { TechStack } from './components/TechStack.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';


function BaseLayout() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-800 to-violet-950">
                <div className="container mx-auto px-4 py-8">
                    <Navbar />
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
            }
        ],
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;