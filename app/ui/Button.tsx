import React from "react";

interface ButtonProps {
  label: string
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button className="bg-cotton-white md:bg-azure-blue text-azure-blue md:text-cotton-white px-6 py-3 rounded-md border border-azure-blue hover:bg-transparent hover:text-azure-blue transition-all font-[550]">
      {label}
    </button>
  );
};

export default Button;
