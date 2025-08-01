
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="w-full py-3 px-6 bg-brand-blue-light hover:bg-brand-blue text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-blue-light/50 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
