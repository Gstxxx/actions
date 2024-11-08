import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { signupSchema } from '@/lib/validation.ts';
import Input from '@/components/Input';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            signupSchema.parse(formData);
            console.log('Form submitted:', formData);
        } catch (error: any) {
            const formErrors: Record<string, string> = {};
            error.errors.forEach((err: any) => {
                formErrors[err.path[0]] = err.message;
            });
            setErrors(formErrors);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePassword = () => setShowPassword(!showPassword);

    const PasswordToggle = () => (
        <button
            type="button"
            onClick={togglePassword}
            className="focus:outline-none"
        >
            {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
                <Eye className="w-5 h-5 text-gray-400" />
            )}
        </button>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md flex justify-center items-center transition duration-500 z-10 hover:scale-105"
        >
            <div className="absolute top-0 w-full h-full bg-gradient-to-br from-gray-100 to-pink-400 to-purple-400 rounded-2xl transform transition duration-500 blur-lg hover:blur-none"></div>
            <span className="absolute top-0 left-0 right-0 bottom-0 z-5 pointer-events-none">
                <span className="absolute top-[-10px] left-10 w-12 h-12 bg-white/10 backdrop-blur-md opacity-0 transition duration-100 animate-pulse shadow-md"></span>
                <span className="absolute bottom-[-10px] right-10 w-12 h-12 bg-white/10 backdrop-blur-md opacity-0 transition duration-500 shadow-md animate-pulse"></span>
            </span>
            <div className="relative w-full max-w-md rounded-2xl shadow-xl p-8 z-10 bg-white/5 backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-gray-600 mt-2">Fill in the form to create your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                icon={User}
                                label="Full Name"
                                error={errors.name}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        icon={Mail}
                        label="Email"
                        error={errors.email}
                    />

                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        icon={Lock}
                        label="Password"
                        error={errors.password}
                        endAdornment={<PasswordToggle />}
                    />

                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                icon={Lock}
                                label="Confirm Password"
                                error={errors.confirmPassword}
                                endAdornment={<PasswordToggle />}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Sign Up
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}
