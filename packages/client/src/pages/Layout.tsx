import { Outlet } from "react-router-dom";

import { Navbar } from '@/components/Navbar.tsx';

export function LayoutPages() {
    return (
        <div >
            <div className="container mx-auto px-4 py-8">
                {!window.location.pathname.startsWith('/dashboard') && <Navbar />}
                <div className="container mx-auto px-4 py-16 flex justify-center">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}
