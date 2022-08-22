import React, {useState} from 'react';
import './EditLocation.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import {editLocation, removeLocation} from '../../services/Methods/location';
import Dropdown from '../../components/reusable/Dropdown/Dropdown';
import Input from '../../components/reusable/Input/Input';
import AddCharger from '../../components/AddChargerPopUp/AddChargerPopUp';
import EditCharger from '../../components/EditChargerPopUp/EditChargerPopUp';
import ChargerList from '../../components/ChargerList/ChargerList';

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

type locationType = {
  id: number;
  name: string;
  location: number;
  postalCode: string;
  lastUpdated: string;
  country: string;
  chargers: Array<charger>;
};

type locationState = {
  id: number;
  name: string;
  location: number;
  postalCode: string;
  lastUpdated: string;
  country: string;
};

const countries = [
  {label: 'Netherland', value: 'NLD'},
  {label: 'Germany', value: 'DEU'},
  {label: 'Belgium', value: 'BEL'},
  {label: 'Switzerland', value: 'CHE'},
  {label: 'United Kingdom', value: 'GBR'},
];

interface EditLocationProps {}

const EditLocation: React.FunctionComponent<EditLocationProps> = () => {
  const locationState = useLocation();
  const navigate = useNavigate();
  const {id, name, location, chargers, postalCode, country} =
    locationState.state as locationType;

  const [locationData, setLocationData] = useState<locationState>({
    id: id,
    name: name,
    location: location,
    postalCode: postalCode,
    lastUpdated: Date.now().toString(),
    country: country,
  });
  const [charger, setCharger] = useState<charger[]>([...chargers]);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isEditChargerPopUpVisible, setEditChargerPopUpVisible] =
    useState(false);
  const [chargerID, setChargerId] = useState(0);

  const onSelectOption = (value: option) => {
    setLocationData({...locationData, country: value.value});
  };
  const onChangeInput = (value: string, id: string) => {
    switch (id) {
      case 'NAME':
        setLocationData({...locationData, name: value});
        break;
      case 'LOCATION_NO':
        setLocationData({...locationData, location: parseInt(value)});
        break;
      case 'POSTAL_CODE':
        setLocationData({...locationData, postalCode: value});
        break;
      default:
        return null;
    }
  };
  const onEditPress = (id:number) => {
    console.log('onEditPress');
    setChargerId(id);
    setEditChargerPopUpVisible(true);
  };
  const onDeletePress = (id: number) => {
    console.log('onDeletePress');
    const data = charger.filter((charger) => charger.id !== id);
    setCharger([...data]);
  };
  const popUp = (value: boolean) => {
    setPopUpVisible(value);
  };
  const mutation = useMutation((data: any) => {
    return editLocation(data);
  });
  const mutationDelete = useMutation((data: any) => {
    return removeLocation(data);
  });

  const onSave = () => {
    const data = {...locationData, chargers: [...charger]};
    mutation.mutate(data);
    navigate('/');
  };
  const onRemove = () => {
    const data = {id: locationData.id};
    mutationDelete.mutateAsync(data);
    navigate('/');
  };
  const onBack = () => {
    navigate('/');
  };
  const onClosePress = () => {
    setPopUpVisible(false);
  };
  const onSaveCharger = (chargerObj: charger) => {
    setPopUpVisible(false);
    setCharger([...charger, chargerObj]);
  };
  const onEditClosePress = () => {
    setEditChargerPopUpVisible(false);
  };
  const onEditSaveCharger = (chargerObj: charger) => {
    const {id, status, serialNumber, type} = chargerObj;
    console.log('id', id);
    const updatedData = charger.map((x) =>
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
            chargerData={charger}
            chargerId={chargerID}
          />
        </div>
      )}
      <div
        className={`wrapper ${isPopUpVisible && 'overlay'} ${
          isEditChargerPopUpVisible && 'overlay'
        }`}
      >
        <h3>Edit Location</h3>
        <div className="add-location-wrapper">
          <div className="horizontal">
            <Input
              id="NAME"
              defaultValue={locationData.name}
              title="Name"
              placeholder="Name"
              onChangeInput={onChangeInput}
            />
            <Input
              id="LOCATION_NO"
              defaultValue={locationData.location}
              title="Location No"
              placeholder="Location No"
              onChangeInput={onChangeInput}
            />
          </div>
          <div className="horizontal">
            <Input
              id="POSTAL_CODE"
              defaultValue={locationData.postalCode}
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
          chargers={charger}
        />
        <div className="btn-wrapper">
          <button onClick={onRemove} className="remove-button">
            Remove Location
          </button>
          <div>
            <button onClick={onBack} className="back-button">
              Back
            </button>
            <button onClick={onSave} className="save-button">
              Save Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLocation;
