import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import logoImg from "../../assets/logo.svg";
import homeBg from "../../assets/home-background.svg";
import { FiLogIn } from "react-icons/fi";

const Home = () => {
  return (
    <>
      <div className="home__container">
        <div className="home__content">
          <div className="home__menu">
            <img src={logoImg} alt="Ecoleta" />
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

              <Link to="/create-point" className="texts__button">
                <div className="texts__icon">
                  <FiLogIn />
                </div>
                <span> Cadastre um ponto de coleta </span>
              </Link>
            </div>

            <img src={homeBg} alt="Ecoleta" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
