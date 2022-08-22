import React from 'react';
import './Button.scss';

interface ButtonProps {
    type?: any,
    disabled?: boolean,
    value: string,
    onPress(): any,
}

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return (
    <div>
      <button
        onClick={props.onPress}
        type={props.type}
        disabled={props.disabled}>
        {props.value}
      </button>
    </div>
  );
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};
export default React.memo(Button);
