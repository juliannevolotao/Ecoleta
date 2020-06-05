import React from 'react';

import './styles.scss';

const ModalSearch: React.FC = () => {
  return (
    <> 
      <div className="search__container">
        <div className="search__fade"></div>
        <div className="search__content">
          <h2> Pontos de coleta </h2>
 
          <select>
            <option> Selecione o UF </option>
          </select>
          <select>
            <option> Selecione a Cidade </option>
          </select>
          {/* <input type='text' id="uf" placeholder="Selecione o UF"> </input>
          <input type='text' id="city" placeholder="Selecione a Cidade"> </input> */}
          <button className="search__button">Buscar</button>
        </div>
      </div>
    </>
  )
};

export default ModalSearch;