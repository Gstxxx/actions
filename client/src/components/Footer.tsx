import React from 'react';

export function Footer() {
    return (
        <footer className="mt-32 text-center text-white/70">
            <p>© {new Date().getFullYear()} Actions Project. All rights reserved.</p>
        </footer>
    );
}