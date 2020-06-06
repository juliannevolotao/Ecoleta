import React, { ChangeEventHandler, MouseEventHandler } from 'react';

import './styles.scss';

interface ModalSearchProps {
  ufs: string[];
  cities: string[];
  handleOnChangeSelectUF: ChangeEventHandler<HTMLSelectElement>;
  handleOnChangeSelectCity: ChangeEventHandler<HTMLSelectElement>;
  handleSearchPoints: MouseEventHandler<HTMLButtonElement>;
}

const ModalSearch: React.FC<ModalSearchProps> = (props) => {
  return (
    <> 
      <div className="search__container">
        <div className="search__fade"></div>
        <div className="search__content">
          <h2> Pontos de coleta </h2>
 
          <select onChange={props.handleOnChangeSelectUF}>
            <option value="0"> Selecione o UF </option>
            {
              props.ufs.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))
            }
          </select>
          <select onChange={props.handleOnChangeSelectCity}>
            <option value="0"> Selecione a Cidade </option>
            {
              props.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))
            }
          </select>
          <button onClick={props.handleSearchPoints} className="search__button">Buscar</button>
        </div>
      </div>
    </>
  )
};

export default ModalSearch;