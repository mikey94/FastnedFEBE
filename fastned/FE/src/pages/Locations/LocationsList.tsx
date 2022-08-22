import React from 'react';
import './LocationList.scss';
import Button from '../../components/reusable/Button/Button';
import {timeDifference} from '../../utils/lib/helpers';

interface LocationListProps {
  data: Array<Object>;
  onEditPress(data: any): any;
}

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

const LocationList: React.FunctionComponent<LocationListProps> = ({
  data,
  onEditPress,
}: LocationListProps) => {
  const currentTimestamp = Date.now();
  const onClick = (data: location) => {
    onEditPress(data);
  };
  return (
    <div className="table-wrapper">
      <table>
        <tbody>
          <tr>
            <th>Location</th>
            <th>Location No</th>
            <th>Chargers</th>
            <th>Country</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
          {data.map((val: any, key) => {
            const time = timeDifference(currentTimestamp, val.lastUpdated);
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.location}</td>
                <td>{val.chargers.length}</td>
                <td>{val.country}</td>
                <td>{time}</td>
                <td>
                  <Button value="Edit" onPress={() => onClick(val)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LocationList;
