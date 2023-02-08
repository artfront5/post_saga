import React from "react";

type ButtonProps = {
  iconClassName: string;
  children: React.ReactNode;
};

export const Icon: React.FC<ButtonProps> = ({ iconClassName, children }) => {
  return (
    <>
      <i className={iconClassName}>{children}</i>
    </>
  );
};
