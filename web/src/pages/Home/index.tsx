import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import logoImg from "../../assets/logo.svg";
import homeBg from "../../assets/home-background.svg";
import { FiLogIn, FiSearch } from "react-icons/fi";

import ModalSearch from '../../components/ModalSearch';

const Home = () => {
  const [searchPoints, setSearchPoints] = useState<boolean>(false);

  const handleSearchButton = () => {
    setSearchPoints(true)
  }

  return (
    <>
    {searchPoints && (

      <ModalSearch />
    )}
    <div className="home__container">
      <div className="home__content">
        <div className="home__menu">
          <img src={logoImg} alt="Ecoleta" />
          <Link to="/create-point" className="home__button">
            <FiLogIn />
            <span> Cadastre um ponto de coleta </span>
          </Link>
        </div>

        <div className="home__body">
          <div className="home__texts">
            <h1>
              {" "}
              Seu marketplace <p> de coleta de resíduos.</p>{" "}
            </h1>
            <p className="texts__legend">
              Ajudamos pessoas a encontrarem pontos
              <p>de coleta de forma eficiente.</p>
            </p>

            <button onClick={handleSearchButton} className="texts__button">
              <div className="texts__icon">
                <FiSearch />
              </div>
              <span> Pesquisar pontos de coleta </span>
            </button>
          </div>

          <img src={homeBg} alt="Ecoleta" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
