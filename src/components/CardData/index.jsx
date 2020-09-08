import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import './CardData.css';

const CardData = ({ title, cases, total, active, isRed, onClick }) => {
  return (
    <Card
      className={`cardData ${active && 'cardData--selected'} ${
        isRed && 'cardData--red'
      }`}
      onClick={onClick}
    >
      <CardContent>
        <Typography className='cardData__title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className={`cardData__cases ${!isRed && 'cardData__cases--green'}`}>
          {cases}
        </h2>
        <Typography className='cardData__total' color='textSecondary'>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};
CardData.propTypes = {
  title: PropTypes.string,
  cases: PropTypes.number,
  total: PropTypes.number,
  onClick: PropTypes.func,
};
export default CardData;
