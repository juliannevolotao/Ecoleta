import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

const CreatePoint = () => {
  return (
    <>
      <div className="create__container">
        <div className="create__content">
          <div className="create__menu">
            <img src={logoImg} alt="Ecoleta" />
            <Link className="menu__back" to="/">
              <FiArrowLeft />
              Voltar para home
            </Link>
          </div>

          <div className="create__body">
            <form className="create__form">
              <h1>
                Cadastro do <p>ponto de coleta</p>
              </h1>


              <fieldset className="form__box">
                <legend>
                  <h2> Dados da entidade </h2>
                </legend>

                <div className="form__field">
                  <label htmlFor="name">Nome da entidade</label>
                  <input name="name" type="text" id="name"></input>
                </div>

                <div className="form__group">
                  <div className="form__field">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" id="email"></input>
                  </div>

                  <div className="form__field">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <input name="whatsapp" type="text" id="whatsapp"></input>
                  </div>
                </div>
              </fieldset>


              <fieldset className="form__box">
                <legend>
                  <h2> Endereço </h2>
                  <span> Selecione o endereço no mapa </span> 
                </legend>

                <div className="form__group">

                  <div className="form__field">
                    <label htmlFor="uf">Estado (UF)</label>
                    <select name="uf" id="uf">
                      <option value="0">Selecione um estado</option>
                    </select>
                  </div>

                  <div className="form__field">
                    <label htmlFor="city">Cidade</label>
                    <select name="city" id="city">
                      <option value="0">Selecione um estado</option>
                    </select>
                  </div>

                </div>
              </fieldset>


              <fieldset className="form__box">
                <legend>
                  <h2> Itens de coleta </h2>
                </legend>

                <ul className="form__items">
                  <li>
                    <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
                    <span> óleo de cozinha </span>
                  </li>
                  <li className="selected">
                    <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
                    <span> óleo de cozinha </span>
                  </li>
                  <li>
                    <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
                    <span> óleo de cozinha </span>
                  </li>
                  <li>
                    <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
                    <span> óleo de cozinha </span>
                  </li>
                  <li>
                    <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
                    <span> óleo de cozinha </span>
                  </li>
                  <li>
                    <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo" />
                    <span> óleo de cozinha </span>
                  </li>
                </ul>
              </fieldset>


              <button className="form__submit" type="submit"> Cadastrar Ponto de coleta </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePoint;
