import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthForm() {
    const [formType, setFormType] = useState<'login' | 'signup'>('login');

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {formType === 'login' ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        {formType === 'login'
                            ? "Don't have an account?"
                            : 'Already have an account?'}
                    </p>
                    <button
                        className="text-purple-600 font-semibold"
                        onClick={() => setFormType(formType === 'login' ? 'signup' : 'login')}
                    >
                        {formType === 'login' ? 'Create one here' : 'Login here'}
                    </button>
                </div>
            </div>
        </div>
    );
}
