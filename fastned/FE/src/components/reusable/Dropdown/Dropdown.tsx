import React, {useState, useEffect} from 'react';
import './Dropdown.scss';

type option = {
  label: string;
  value: string;
};

interface DropdownProps {
  options: Array<option>;
  onOptionSelect(value: option): any;
  title: string;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  options,
  onOptionSelect,
  title,
}: DropdownProps) => {
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [showItems, setShowItems] = useState(false);
  const selectItem = (value: option) => {
    setSelectedItem(value);
    setShowItems(false);
  };
  const dropdown = () => {
    setShowItems(!showItems);
  };
  useEffect(() => {
    onOptionSelect(selectedItem);
  }, [selectedItem]);
  return (
    <div className="select-box--box">
      <p className="dropdown-title">{title}</p>
      <div className="select-box--container">
        <div className="select-box--selected-item">{selectedItem.label}</div>
        <div className="select-box--arrow" onClick={dropdown}>
          <span
            className={`${
              showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'
            }`}
          />
        </div>

        <div
          style={{display: showItems ? 'block' : 'none'}}
          className={'select-box--items'}
        >
          {options.map((item, key) => (
            <div
              key={key}
              onClick={() => selectItem(item)}
              className={selectedItem === item ? 'selected' : ''}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dropdown);
