import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import * as constants from '../constants';

const Header = ({ countries, country, getCurrentCountry }) => {
  const onCountryChange = e => {
    getCurrentCountry(e.target.value);
  };

  return (
    <header className='header'>
      <h1>COVID-19 Tracker</h1>
      <FormControl className='app__dropdown'>
        <Select variant='outlined' value={country} onChange={onCountryChange}>
          <MenuItem
            key={constants.DEFAULT_COUNTRY}
            value={constants.DEFAULT_COUNTRY}
          >
            Worldwide
          </MenuItem>
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.value}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </header>
  );
};

export default Header;
