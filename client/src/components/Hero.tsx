import { Link } from 'react-router-dom';

export function Hero() {
    return (
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Manage Your Stock Portfolio
                <span className="block text-purple-200">with Actions Project</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8">
                A powerful platform built with modern technologies to help you track and manage your investments effectively.
            </p>
            <Link
                to="/get-started"
                className="inline-block bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
            >
                Get Started
            </Link>
        </div>
    );
}