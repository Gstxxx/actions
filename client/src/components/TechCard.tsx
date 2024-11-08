import React from 'react';

interface TechCardProps {
    title: string;
    desc: string;
    image: string;
    link: string;
}

export function TechCard({ title, desc, image, link }: TechCardProps) {
    return (
        <div className="relative w-56 h-72 flex justify-center items-center transition duration-500 z-10 hover:scale-105">
            <div className="absolute top-0 left-4 ml-8 w-1/2 h-full bg-gradient-to-br from-pink-500 to-yellow-500 rounded-lg transform transition duration-500 blur-lg hover:blur-none"></div>
            <span className="absolute top-0 left-0 right-0 bottom-0 z-5 pointer-events-none">
                <span className="absolute top-[-10px] left-10 w-12 h-12 bg-white/10 backdrop-blur-md opacity-0 transition duration-100 animate-pulse shadow-md"></span>
                <span className="absolute bottom-[-10px] right-10 w-12 h-12 bg-white/10 backdrop-blur-md opacity-0 transition duration-500 shadow-md animate-pulse"></span>
            </span>
            <div className="relative w-48 h-64 p-5 bg-white/5 backdrop-blur-md shadow-md rounded-lg z-10 flex justify-center items-center">
                <div className="text-center">
                    <a href={link} target="_blank" rel="noreferrer" className="flex justify-center mb-4">
                        <img src={image} alt={title} className="w-16 h-16 rounded-full" />
                    </a>
                    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-white">{desc}</p>
                </div>
            </div>
        </div>
    );
}