import React from 'react';

interface TechCardProps {
    title: string;
    desc: string;
    image: string;
    link: string;
}

export function TechCard({ title, desc, image, link }: TechCardProps) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white justify-items-center hover:bg-white/20 transition-colors duration-200 hover:scale-105 hover:shadow-lg">
            <div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-indigo-200">{desc}</p>
            </div>
            <a href={link} target="_blank" rel="noreferrer" className="flex justify-center">
                <img src={image} alt={title} className="mt-4 w-16 h-16 rounded-full mb-4" />
            </a>
        </div>
    );
}