import React, { ChangeEvent } from "react";

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  name: string;
}

export const Input = ({ handleChange, value, placeholder, name }: Props) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};
