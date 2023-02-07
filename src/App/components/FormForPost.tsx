import React from "react";

type FormProps = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  inputClassName?: string;
};

export const FormForPost: React.FC<FormProps> = ({
  value,
  onChange,
  inputClassName,
  placeholder,
}) => {
  return (
    <div className="addPostBox">
      <textarea
        className={inputClassName}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

// export default Form;
