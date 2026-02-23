import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', id, ...props }, ref) => {
        const generatedId = id || Math.random().toString(36).substring(7);

        return (
            <div className={`w-full ${className}`}>
                {label && (
                    <label htmlFor={generatedId} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={generatedId}
                    className={`block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors 
                        ${error
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500'
                            : 'border-gray-300 text-gray-900 focus:border-indigo-500'
                        }`}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
