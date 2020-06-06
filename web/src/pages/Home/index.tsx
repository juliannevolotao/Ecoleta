import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.scss";
import logoImg from "../../assets/logo.svg";
import homeBg from "../../assets/home-background.svg";
import { FiLogIn, FiSearch } from "react-icons/fi";

import ModalSearch from "../../components/ModalSearch";

import axios from "axios";

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [searchPoints, setSearchPoints] = useState<boolean>(false);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  let history = useHistory();

  useEffect(() => {
    const fetchUfs = async () => {
      try {
        const response = await axios.get<IBGEUFResponse[]>(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );

        const siglasUF = response.data.map((uf) => {
          return uf.sigla;
        });

        setUfs(siglasUF);
      } catch (err) {
        history.push("/");
      }
    };

    fetchUfs();
  }, [history]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get<IBGECityResponse[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        );
        const namesCity = response.data.map((city) => {
          return city.nome;
        });

        setCities(namesCity);
      } catch (err) {
        history.push("/");
      }
    };

    fetchCities();
  }, [selectedUf]);

  const handleSearchButton = () => {
    setSearchPoints(true);
  };

  const handleOnChangeSelectUF = (event: ChangeEvent<HTMLSelectElement>) => {
    const UF = event.target.value;
    setSelectedUf(UF);
  };

  const handleOnChangeSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const City = event.target.value;
    setSelectedCity(City);
  };

  const handleSearchPoints = () => {
    if(!selectedUf || !selectedCity){
      return console.log("Selecione a cidade e o estado")
    }

    history.push(`/list-points/${selectedUf}/${selectedCity}`);
    // /points/filter?uf=${selectedUf}&city=${selectedCity}
  };

  return (
    <>
      {searchPoints && (
        <ModalSearch
          handleSearchPoints={handleSearchPoints}
          handleOnChangeSelectUF={handleOnChangeSelectUF}
          handleOnChangeSelectCity={handleOnChangeSelectCity}
          ufs={ufs}
          cities={cities}
        />
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
