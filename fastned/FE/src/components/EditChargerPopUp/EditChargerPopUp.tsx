import React, {useState} from 'react';
import './EditChargerPopUp.scss';
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

const statusList = [
  {label: 'Connected', value: 'CONNECTED'},
  {label: 'Not Connected', value: 'NOT_CONNECTED'},
  {label: 'Removed', value: 'REMOVED'},
];

const chargerTypes = [
  {label: 'HPC', value: 'HPC'},
  {label: 'T52', value: 'T52'},
  {label: 'T53C', value: 'T53C'},
];

interface EditChargerProps {
  onClosePress(): any;
  onSavePress(charger: charger): any;
  chargerId: number;
  chargerData: Array<charger>;
}

const EditCharger: React.FunctionComponent<EditChargerProps> = ({
  onClosePress,
  onSavePress,
  chargerId,
  chargerData,
}) => {
  const selectedCharger = chargerData.find((x)=> x.id === chargerId);
  const {id, serialNumber, status, type} = selectedCharger as charger;
  const [charger, setCharger] = useState<charger>({
    id: id,
    type: type,
    serialNumber: serialNumber,
    status: status,
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
      <h3>Edit Charger</h3>
      <div className="popup-content-wrapper">
        <Dropdown
          title="Status"
          options={statusList}
          onOptionSelect={onStatusOption}
        />
        <Dropdown
          title="Charger Type"
          options={chargerTypes}
          onOptionSelect={onChargerOption}
        />
        <Input
          id="SERIALNUMBER"
          defaultValue={charger.serialNumber}
          title="Serial Number"
          placeholder="Serial Number"
          onChangeInput={onChangeInput}
        />
      </div>
      <div className="option-wrapper">
        <button onClick={onSave} className="save-button">
          Save
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCharger;
