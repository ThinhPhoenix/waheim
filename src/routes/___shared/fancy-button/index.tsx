import { Button } from 'antd';
import type { BaseButtonProps } from 'antd/es/button/Button';
import './fancy-button.css';

interface ButtonProps extends BaseButtonProps {
  onClick?: () => void;
}

export default function FancyButton({ className, ...props }: ButtonProps) {
  const combinedClassName =
    props.color === 'primary'
      ? `antd-primary-btn ${className ?? ''}`
      : (className ?? '');

  return (
    <Button {...props} className={`${combinedClassName} text-primary-text!`}>
      {props.children}
    </Button>
  );
}
