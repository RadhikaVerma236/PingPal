import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  ...rest
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""} flex flex-col gap-1`}>
      
      {label && (
        <label className="text-sm font-medium text-secondary">
          {label}
        </label>
      )}

      <div className="relative w-full">
        
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {leftIcon}
          </div>
        )}

        <input
          className={`
            w-full
            py-2
            rounded-xl
            bg-surface
            border border-default
            text-primary
            placeholder:text-muted
            shadow-soft
            transition-all duration-200
            focus-ring
            ${leftIcon ? "pl-9" : "pl-4"}
            ${rightIcon ? "pr-9" : "pr-4"}
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...rest}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <span className="text-sm text-danger">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
