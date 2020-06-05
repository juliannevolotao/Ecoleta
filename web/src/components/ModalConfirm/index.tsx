import React from 'react';

import './styles.scss';
import { FiCheckCircle } from 'react-icons/fi';


const ModalConfirm: React.FC = (props) => {

  return (
    <>
      <div className="confirm__container">
        <div className="confirm__content">
        <FiCheckCircle />
        <h2> Cadastro concluído! </h2>

        </div>
      </div>
    </>
  )
}

export default ModalConfirm;