import { TechCard } from './TechCard';

export function TechStack() {

    const TECH_STACK = [
        { title: 'Node.js', desc: 'Robust backend', image: 'https://nodejs.org/static/logos/nodejsLight.svg', link: 'https://nodejs.org' },
        { title: 'Hono', desc: 'Lightning-fast API', image: 'https://hono.dev/images/logo-small.png', link: 'https://hono.dev' },
        { title: 'Tailwind', desc: 'Beautiful UI', image: 'https://logospng.org/download/tailwind-css/tailwind-css-4096.png', link: 'https://tailwindcss.com' },
        { title: 'Prisma', desc: 'Type-safe DB', image: 'https://prismalens.vercel.app/header/logo-white.svg', link: 'https://prisma.io' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 md:ml-16 lg:ml-3 lg:grid-cols-4 gap-6">
                {TECH_STACK.map((tech, i) => (
                    <TechCard key={i} {...tech} />
                ))}

            </div>
        </div>
    );
}