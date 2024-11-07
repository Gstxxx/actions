import { Link } from 'react-router-dom';
import { Navbar } from './components/Navbar.tsx';
import { TechCard } from './components/TechCard.tsx';
import { Footer } from './components/Footer.tsx';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';

const TECH_STACK = [
    { title: 'Node.js', desc: 'Robust backend', image: 'https://nodejs.org/static/logos/nodejsLight.svg', link: 'https://nodejs.org' },
    { title: 'Hono', desc: 'Lightning-fast API', image: 'https://hono.dev/images/logo-small.png', link: 'https://hono.dev' },
    { title: 'Tailwind', desc: 'Beautiful UI', image: 'https://logospng.org/download/tailwind-css/tailwind-css-4096.png', link: 'https://tailwindcss.com' },
    { title: 'Prisma', desc: 'Type-safe DB', image: 'https://prismalens.vercel.app/header/logo-white.svg', link: 'https://prisma.io' }
];

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
                <main className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl font-bold text-white mb-6">
                        Manage Your Stock Portfolio
                        <span className="block text-indigo-200">with Actions Project</span>
                    </h1>

                    <p className="text-xl text-white/90 mb-12">
                        A powerful platform built with modern technologies to help you track and manage your investments effectively.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {TECH_STACK.map((tech, i) => (
                            <TechCard key={i} {...tech} />
                        ))}
                    </div>

                    <div className="flex justify-center space-x-4">
                        <Link to="/signup" className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                            Get Started
                        </Link>
                    </div>
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