import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InputProps {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: LucideIcon;
    label: string;
    error?: string;
    endAdornment?: React.ReactNode;
}

export default function Input({
    type,
    name,
    value,
    onChange,
    icon: Icon,
    label,
    error,
    endAdornment,
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const isActive = isFocused || value.length > 0;

    return (
        <div className="relative">
            <div
                className={`flex items-center space-x-2 border rounded-lg px-3 py-2 transition-colors ${isFocused ? 'border-purple-500' : error ? 'border-red-500' : 'border-gray-300'
                    }`}
            >
                <Icon className={`w-5 h-5 ${isFocused ? 'text-purple-500' : 'text-gray-400'}`} />
                <div className="relative flex-1">
                    <AnimatePresence mode="wait">
                        {isActive && (
                            <motion.label
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ x: -37, y: -27, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}
                                className={`absolute left-0 text-xs font-medium ${error ? 'text-red-500' : isFocused ? 'text-purple-500' : 'text-gray-500'
                                    }`}
                            >
                                {label}
                            </motion.label>
                        )}
                    </AnimatePresence>
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={isActive ? '' : label}
                        className="w-full outline-none bg-transparent placeholder-gray-400"
                    />
                </div>
                {endAdornment}
            </div>
            <AnimatePresence mode="wait">
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}