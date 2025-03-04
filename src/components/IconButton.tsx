import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <button {...props} className={classNames('cursor-pointer outline-none', className)}>
      {children}
    </button>
  );
}
