import React, {ChangeEvent, useEffect, useState} from 'react';
import './Input.scss';

interface InputProps {
  onChangeInput(value: string, id: string): any;
  placeholder: string;
  title: string;
  id: string;
  defaultValue?: any;
}

const Input: React.FunctionComponent<InputProps> = ({
  onChangeInput,
  placeholder,
  title,
  id,
  defaultValue,
}: InputProps) => {
  const [value, setValue] = useState(defaultValue);
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    onChangeInput(value, id);
  }, [value]);
  return (
    <div className="input-wrapper">
      <p className="input-title">{title}</p>
      <input
        id={id}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
};

Input.defaultProps = {
  defaultValue: '',
};

export default React.memo(Input);
