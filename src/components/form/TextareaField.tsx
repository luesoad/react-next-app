import React from "react";
import { BaseFormFieldProps } from "../../types/form";

type TextareaFieldProps = BaseFormFieldProps &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        ref?: React.Ref<HTMLTextAreaElement>;
        characterCount?: boolean;
    };

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    (
        {
            id,
            label,
            error,
            className = "",
            value,
            maxLength,
            characterCount,
            ...props
        },
        ref
    ) => (
        <div className="mb-6">
            <label
                htmlFor={id}
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--dark-purple)" }}
            >
                {label}
            </label>
            <textarea
                id={id}
                ref={ref}
                className={`w-full px-3 py-2 rounded-lg border ${error ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] bg-white text-gray-900 resize-none ${className}`}
                value={value}
                maxLength={maxLength}
                {...props}
            />
            <div className="flex justify-between">
                {error && (
                    <span id={`${id}-error`} className="text-sm text-red-600" role="alert">
                        {error}
                    </span>
                )}
                {characterCount && typeof value === "string" && maxLength && (
                    <span className="text-xs text-gray-500 ml-auto">
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    )
);

export default TextareaField;
