import React from 'react';

import './styles.scss';
import { FiCheckCircle } from 'react-icons/fi';


const ModalInfo: React.FC = (props) => {

  return (
    <>
      <div className="info__container">
        <div className="info__content">

          {props.children}

        {/* <FiCheckCircle />
        <h2> Cadastro concluído! </h2> */}

        </div>
      </div>
    </>
  )
}

export default ModalInfo;