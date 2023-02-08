import React from "react";

type ButtonProps = {
  onClick: () => void;
  buttonClassName?: string;
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  buttonClassName,
  children,
}) => {
  return (
    <div>
      <button onClick={onClick} className={buttonClassName}>
        {children}
      </button>
    </div>
  );
};
