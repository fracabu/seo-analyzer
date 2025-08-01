
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-300">
                {label}
            </label>
            <input
                id={id}
                type="text"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-brand-blue-light focus:border-brand-blue-light outline-none transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                {...props}
            />
        </div>
    );
};

export default Input;
