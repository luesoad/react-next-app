import React from "react";
import { BaseFormFieldProps } from "../../types/form";

type InputFieldProps = BaseFormFieldProps &
    React.InputHTMLAttributes<HTMLInputElement> & {
        ref?: React.Ref<HTMLInputElement>;
    };

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ id, label, error, className = "", ...props }, ref) => (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--dark-purple)" }}
            >
                {label}
            </label>
            <input
                id={id}
                ref={ref}
                className={`w-full px-3 py-2 rounded-lg border ${error ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] bg-white text-gray-900 ${className}`}
                {...props}
            />
            {error && (
                <span id={`${id}-error`} className="text-sm text-red-600" role="alert">
                    {error}
                </span>
            )}
        </div>
    )
);

export default InputField;
