import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
export function Navbar() {
    return (
        <div>
            <nav className="flex justify-between items-center">
                <div className="flex justify-start">
                    <Link to="/" className="px-6 py-2 text-white hover:text-indigo-200 transition-colors">
                        <HomeIcon />
                    </Link>
                </div>
                <div className="flex justify-end space-x-4">
                    <Link to="/login" className="px-6 py-2 text-white hover:text-indigo-200 transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                        Sign up
                    </Link>
                </div>
            </nav>
        </div>

    );
}