
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons'


const Spinner: React.FC = () => {
  return (
    <FontAwesomeIcon icon={faSpinner} spin  />
  );
}

export default Spinner;
