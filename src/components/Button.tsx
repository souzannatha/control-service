import { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  variant: "reset" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({ label, variant, onClick }: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-md font-semibold transition focus:outline-none";

  const variantStyles = {
    reset: "bg-gray-300 hover:bg-gray-400 text-black",
    submit: "bg-indigo-600 hover:bg-indigo-700 text-white",
  };

  return (
    <button
      type={variant}
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
