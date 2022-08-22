import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query';
import Locations from './Locations';

const client = new QueryClient();

it('check renders correctly', ()=> {
  const {getByText} = render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <Locations />
        </QueryClientProvider>
      </BrowserRouter>,
  );
  expect(getByText('Locations')).toBeInTheDocument();
  expect(getByText('Add Location')).toBeInTheDocument();
});

