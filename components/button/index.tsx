import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  title: string;
}

const Button = ({ title, ...props }: ButtonProps) => (
  <button
    className="bg-black rounded-[18px] text-white text-center py-[14px] max-w-[282px] w-full shadow-xs"
    {...props}
  >
    {title}
  </button>
);

export default Button;
