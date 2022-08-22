import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
import Locations from './pages/Locations/Locations';
import AddLocation from './pages/AddLocation/AddLocation';
import EditLocation from './pages/EditLocation/EditLocation';

interface ApplicationProps {}

const Application: React.FunctionComponent<ApplicationProps> = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Locations />} />
            <Route path="/add" element={<AddLocation />} />
            <Route path="/edit" element={<EditLocation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Application;
