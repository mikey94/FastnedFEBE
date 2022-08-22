import React, {useEffect, useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import './Navbar.scss';
import {useOutsideClick} from '../../hooks/hooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    console.log('click outside');
    setIsVisible(false);
  };
  useOutsideClick(handleClick);
  const onNavClick = () => {
    console.log('sasa');
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    console.log('isVisible', isVisible);
  }, [isVisible]);

  return (
    <div>
      <div className="container">
        <div className="navigation-web">
          <Link to="/" className="link">
            <h4>Locations</h4>
          </Link>
          <Link to="/add" className="link">
            <h4>Add Locations</h4>
          </Link>
          <Link to="/edit" className="link">
            <h4>Edit Locations</h4>
          </Link>
        </div>
        <div className="menu-mobile" onClick={onNavClick}>
          <FontAwesomeIcon icon={faBars} size="2x" className="bars-style" />
        </div>
      </div>
      <div
        className={`${
          isVisible ? 'navigation-mobile-open' : 'navigation-mobile-close'
        }`}
      >
        <Link to="/" className="link">
          <h4>Locations</h4>
        </Link>
        <Link to="/add" className="link">
          <h4>Add Locations</h4>
        </Link>
        <Link to="/edit" className="link">
          <h4>Edit Locations</h4>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
