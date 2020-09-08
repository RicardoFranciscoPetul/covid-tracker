import React from 'react';
import './Table.css';
import numeral from 'numeral';
import PropTypes from 'prop-types';

const Table = ({ countries }) => {
  return (
    <div className='table'>
      <table>
        <tbody>
          {countries.map(({ country, cases }, index) => (
            <tr key={index}>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format('0,0')}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  countries: PropTypes.array.isRequired,
};

export default Table;
