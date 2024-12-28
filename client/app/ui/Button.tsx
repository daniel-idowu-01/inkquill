import React from "react";

interface ButtonProps {
  label: string;
  whiteBg: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, whiteBg }) => {
  return (
    <button
      className={`${
        whiteBg
          ? "bg-cotton-white text-azure-blue hover:text-cotton-white"
          : "bg-cotton-white md:bg-azure-blue text-azure-blue md:text-cotton-white hover:text-cotton-white md:hover:text-azure-blue border-cotton-white md:border-azure-blue"
      } px-6 py-3 rounded-md border hover:bg-transparent transition-all font-[550] shadow-md`}
    >
      {label}
    </button>
  );
};

export default Button;
