import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
export function NavbarDashboard() {
    return (
        <div>
            <nav className="flex justify-between items-center">
                <div className="flex justify-start">
                    <Link to="/dashboard" className="px-6 py-2 text-white hover:text-indigo-200 transition-colors">
                        <HomeIcon />
                    </Link>
                </div>
                <div className="flex justify-end space-x-4">
                    <Link to="/dashboard/quotes" className="px-6 py-2 text-white hover:text-indigo-200 transition-colors">
                        Quotes
                    </Link>
                </div>
            </nav>
        </div>

    );
}