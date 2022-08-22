import React from 'react';
import {render} from '@testing-library/react';
import LocationList from './LocationsList';


const sampleData = [
  {
    _id: '62f73c6e24ae1cba9fb6e31b',
    id: 1111,
    name: 'Aalscholver',
    location: 112233,
    chargers: [
      {
        id: 3134102,
        type: 'T53C',
        serialNumber: 'T12-345-055',
        status: 'CONNECTED',
        lastUpdated: '1660369638',
        _id: '62f73c6e24ae1cba9fb6e31c',
      },
    ],
    postalCode: '12345',
    lastUpdated: '1660369638',
    country: 'NLD',
    __v: 0,
  },
];
const editPress = (data:any) => {
  // navigation
};
it('check labels renders correctly', () => {
  const {getByText} = render(
      <LocationList
        data={[...sampleData]}
        onEditPress={function(data: any) {
          editPress(data);
        }}
      />,
  );
  expect(getByText('Location')).toBeInTheDocument();
  expect(getByText('Location No')).toBeInTheDocument();
  expect(getByText('Chargers')).toBeInTheDocument();
  expect(getByText('Country')).toBeInTheDocument();
  expect(getByText('Last Updated')).toBeInTheDocument();
  expect(getByText('Actions')).toBeInTheDocument();
});

