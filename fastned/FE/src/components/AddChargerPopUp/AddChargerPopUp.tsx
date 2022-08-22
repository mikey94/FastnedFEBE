import React, {useState} from 'react';
import './AddChargerPopUp.scss';
import Dropdown from '../../components/reusable/Dropdown/Dropdown';
import Input from '../../components/reusable/Input/Input';

type charger = {
  id: number;
  type: string;
  serialNumber: string;
  status: string;
  lastUpdated: string;
};

type option = {
  label: string;
  value: string;
};

interface AddChargerProps {
  onClosePress(): any;
  onSavePress(charger: charger): any;
}

const status = [
  {label: 'Connected', value: 'CONNECTED'},
  {label: 'Not Connected', value: 'NOT_CONNECTED'},
  {label: 'Removed', value: 'REMOVED'},
];

const chargerTypes = [
  {label: 'HPC', value: 'HPC'},
  {label: 'T52', value: 'T52'},
  {label: 'T53C', value: 'T53C'},
];

const AddCharger: React.FunctionComponent<AddChargerProps> = ({
  onClosePress,
  onSavePress,
}) => {
  const [charger, setCharger] = useState<charger>({
    id: Math.floor(1000 + Math.random() * 9000),
    type: 'HPC',
    serialNumber: '',
    status: 'CONNECTED',
    lastUpdated: Date.now().toString(),
  });
  const onStatusOption = (value: option) => {
    setCharger({...charger, status: value.value});
  };
  const onChargerOption = (value: option) => {
    setCharger({...charger, type: value.value});
  };
  const onChangeInput = (value: string) => {
    setCharger({...charger, serialNumber: value});
  };
  const onSave = () => {
    onSavePress(charger);
  };
  const onCancel = () => {
    onClosePress();
  };
  return (
    <div className="main-wrapper">
      <button onClick={onClosePress} className="close-button">
        X
      </button>
      <h3>Add Charger</h3>
      <div className="popup-content-wrapper">
        <Dropdown
          title="Status"
          options={status}
          onOptionSelect={onStatusOption}
        />
        <Dropdown
          title="Charger Type"
          options={chargerTypes}
          onOptionSelect={onChargerOption}
        />
        <Input
          id="SERIALNUMBER"
          title="Serial Number"
          placeholder="Serial Number"
          onChangeInput={onChangeInput}
        />
      </div>
      <div className="option-wrapper">
        <button onClick={onSave} className="save-button">
          Save
        </button>
        <button onClick={onCancel} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default React.memo(AddCharger);
