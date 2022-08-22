import React from 'react';
import {render} from '@testing-library/react';
import EditLocation from './EditLocation';
import {BrowserRouter} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query';

const client = new QueryClient();

it('check renders correctly', ()=> {
  const {getByText, getByPlaceholderText} = render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <EditLocation />
        </QueryClientProvider>
      </BrowserRouter>,
  );
  expect(getByText('Edit Location')).toBeInTheDocument();
  expect(getByText('Remove Location')).toBeInTheDocument();
  expect(getByText('Back')).toBeInTheDocument();
  expect(getByText('Save Location')).toBeInTheDocument();
  expect(getByPlaceholderText('Name')).toBeTruthy();
  expect(getByPlaceholderText('Location No')).toBeTruthy();
  expect(getByPlaceholderText('Postal Code')).toBeTruthy();
});

