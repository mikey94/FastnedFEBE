import React from 'react';
import loader from '../../../assets/loader.svg';
import './Spinner.scss';

interface SpinnerProps {

}

const Spinner: React.FunctionComponent<SpinnerProps> = () => {
  return <img className="Spinner" src={loader} alt="Spinner" />;
};

export default Spinner;
