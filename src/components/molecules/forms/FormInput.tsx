import React, { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, containerClassName, id, ...props }, ref) => {
    const defaultId = useId();
    const inputId = id || defaultId;
    const errorId = `${inputId}-error`;

    return (
      <div className={twMerge("flex flex-col w-full", containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="mb-2 text-sm font-bold text-charcoal">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={twMerge(
            "w-full px-5 py-3 rounded-full bg-cream outline-none transition-colors duration-200",
            "border-2 border-peach text-charcoal placeholder:text-charcoal/50",
            "focus:border-terracotta focus:ring-4 focus:ring-terracotta/20",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <span id={errorId} className="mt-2 text-xs font-bold text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);
FormInput.displayName = 'FormInput';
