import React from 'react';

import copy from '../../../common/data/copy.json';

const CardLocation = ({ language, data, isPrecise }) => {
  let icono = '';

  if (data.ubicacion === 'confirmada') {
    icono = 'where_to_vote';
  } else if (data.ubicacion === 'aproximada') {
    icono = 'not_listed_location';
  } else {
    icono = 'location_off';
  }

  return (
    <div className="card-cell location">
      <p>
        <i className="material-icons left">location_on</i>
        {`${data.location}`}
        <br />
        <i className="material-icons left">{icono}</i>
        {data.ubicacion ? `Ubicación ${data.ubicacion}` : 'Ubicación por confirmar'}
      </p>
    </div>
  );
};

export default CardLocation;
