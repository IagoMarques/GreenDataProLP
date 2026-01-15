import React from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton = ({ children, className = "", ...props }: PrimaryButtonProps) => {
  return (
    <button 
      className={`bg-[#003332] cursor-pointer flex items-center justify-center px-4 py-3 rounded-[12px] transition-all hover:opacity-90 active:scale-95 text-white font-['Inter',sans-serif] font-medium text-[16px] xl:text-[18px] tracking-[-0.08px] xl:tracking-[-0.09px] ${className}`}
      {...props}
    >
      <span className="leading-[1.45] whitespace-nowrap">
        {children}
      </span>
    </button>
  );
};
