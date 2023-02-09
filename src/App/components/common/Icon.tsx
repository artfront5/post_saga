import React from "react";

type iconProps = {
  iconClassName: string;
  children: React.ReactNode;
};

export const Icon: React.FC<iconProps> = ({ iconClassName, children }) => {
  return (
    <>
      <i className={iconClassName}>{children}</i>
    </>
  );
};
