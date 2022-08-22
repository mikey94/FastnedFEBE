import React from 'react';
import './Locations.scss';
import {useNavigate} from 'react-router-dom';
import LocationList from './LocationsList';
import {useQuery} from 'react-query';
import {getLocations} from '../../services/Methods/location';
import Spinner from '../../components/reusable/loader/Spinner';
import {Link} from 'react-router-dom';

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
  chargers: Array<charger>;
};

interface LocationsProps {}

const Locations: React.FunctionComponent<LocationsProps> = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line max-len
  const {isLoading, data} = useQuery('locationData', getLocations, {refetchOnWindowFocus: 'always'});

  const onEditPress = (data: location) => {
    const payload: location = {...data};
    const path = '/edit';
    navigate(path, {state: payload});
  };

  return (
    <div className="wrapper">
      <div className="wrapper-location">
        <h3>Locations</h3>
        <Link to="/add" className="link">
          <button className="add-button">Add Location</button>
        </Link>
      </div>
      <div className="list-wrapper">
        {isLoading ? (
          <Spinner />
        ) : (
          <LocationList data={data} onEditPress={onEditPress} />
        )}
      </div>
    </div>
  );
};

export default Locations;
