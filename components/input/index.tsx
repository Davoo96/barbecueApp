import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={`block py-4 pl-5 max-w-[282px] w-full mx-auto rounded-sm shadow-xs placeholder:italic ${className}`}
      {...props}
    />
  );
};

export default Input;
