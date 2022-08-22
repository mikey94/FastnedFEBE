import React, {useState} from 'react';
import './AddLocation.scss';
import {useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import {addLocations} from '../../services/Methods/location';
import Dropdown from '../../components/reusable/Dropdown/Dropdown';
import Input from '../../components/reusable/Input/Input';
import AddCharger from '../../components/AddChargerPopUp/AddChargerPopUp';
import ChargerList from '../../components/ChargerList/ChargerList';
import EditCharger from '../../components/EditChargerPopUp/EditChargerPopUp';

type option = {
  label: string;
  value: string;
};

type charger = {
  id: number;
  type: string;
  serialNumber: string;
  status: string;
  lastUpdated: string;
};

type location = {
  id: number;
  name: string;
  location: number;
  postalCode: string;
  lastUpdated: string;
  country: string;
};

interface AddLocationProps {}

const countries = [
  {label: 'Netherland', value: 'NLD'},
  {label: 'Germany', value: 'DEU'},
  {label: 'Belgium', value: 'BEL'},
  {label: 'Switzerland', value: 'CHE'},
  {label: 'United Kingdom', value: 'GBR'},
];

const AddLocation: React.FunctionComponent<AddLocationProps> = () => {
  const navigate = useNavigate();
  const [chargers, setCharger] = useState<charger[]>([]);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [location, setLocation] = useState<location>({
    id: Math.floor(1000 + Math.random() * 9000),
    name: '',
    location: 0,
    postalCode: '',
    lastUpdated: Date.now().toString(),
    country: 'NLD',
  });
  const [isEditChargerPopUpVisible, setEditChargerPopUpVisible] =
    useState(false);
  const [chargerID, setChargerId] = useState(0);
  console.log('location', location);
  console.log('chargers', chargers);

  const onSelectOption = (value: option) => {
    console.log('values', value.value);
    setLocation({...location, country: value.value});
  };
  const onChangeInput = (value: any, id: string) => {
    console.log('onChangeInput', value);
    switch (id) {
      case 'NAME':
        setLocation({...location, name: value});
        break;
      case 'LOCATION_NO':
        setLocation({...location, location: parseInt(value)});
        break;
      case 'POSTAL_CODE':
        setLocation({...location, postalCode: value});
        break;
      default:
        return null;
    }
  };
  const onEditPress = (id: number) => {
    console.log('onEditPress');
    setChargerId(id);
    setEditChargerPopUpVisible(true);
  };
  const onDeletePress = (id: number) => {
    console.log('onDeletePress');
    const data = chargers.filter((charger) => charger.id !== id);
    setCharger([...data]);
  };
  const popUp = (value: boolean) => {
    setPopUpVisible(value);
  };
  const mutation = useMutation((data: any) => {
    console.log('data', data);
    return addLocations(data);
  });
  const onSave = () => {
    const data = {...location, chargers: [...chargers]};
    mutation.mutate(data);
    navigate('/');
  };
  const onBack = () => {
    navigate('/');
  };
  const onClosePress = () => {
    setPopUpVisible(false);
  };
  const onSaveCharger = (charger: charger) => {
    setPopUpVisible(false);
    console.log(charger);
    setCharger([...chargers, charger]);
  };
  const onEditClosePress = () => {
    setEditChargerPopUpVisible(false);
  };
  const onEditSaveCharger = (chargerObj: charger) => {
    const {id, status, serialNumber, type} = chargerObj;
    console.log('id', id);
    const updatedData = chargers.map((x) =>
      x.id === id ?
        {
          id: id,
          status: status,
          serialNumber: serialNumber,
          type: type,
          lastUpdated: Date.now().toString(),
        } :
        x,
    );
    setCharger(updatedData);
    setEditChargerPopUpVisible(false);
    console.log('updatedData', updatedData);
  };
  return (
    <div>
      {isPopUpVisible && (
        <div className="add-charger-popup">
          <AddCharger onSavePress={onSaveCharger} onClosePress={onClosePress} />
        </div>
      )}
      {isEditChargerPopUpVisible && (
        <div className="add-charger-popup">
          <EditCharger
            onSavePress={onEditSaveCharger}
            onClosePress={onEditClosePress}
            chargerData={chargers}
            chargerId={chargerID}
          />
        </div>
      )}
      <div className={`wrapper ${isPopUpVisible && 'overlay'}`}>
        <h3>Add Location</h3>
        <div className="add-location-wrapper">
          <p className="table-title">+ Add New Location</p>
          <div className="horizontal">
            <Input
              id="NAME"
              title="Name"
              placeholder="Name"
              onChangeInput={onChangeInput}
            />
            <Input
              id="LOCATION_NO"
              title="Location No"
              placeholder="Location Number"
              onChangeInput={onChangeInput}
            />
          </div>
          <div className="horizontal">
            {/* <Input
              id="CITY"
              title="City"
              placeholder="Charger types"
              onChangeInput={onChangeInput}
            /> */}
            <Input
              id="POSTAL_CODE"
              title="Postal Code"
              placeholder="Postal Code"
              onChangeInput={onChangeInput}
            />
            <Dropdown
              title="Countries"
              options={countries}
              onOptionSelect={onSelectOption}
            />
          </div>
        </div>
        <ChargerList
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
          onPopUpPress={popUp}
          btnDisable={isPopUpVisible}
          chargers={chargers}
        />
        <div className="button-wrapper">
          <button onClick={onBack} className="back-button">
            Back
          </button>
          <button onClick={onSave} className="save-button">
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
