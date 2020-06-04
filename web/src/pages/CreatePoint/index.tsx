import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";

import api from "../../services/api";
import axios from "axios";

interface Item {
  id: number;
  name: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  
  // será armazenado um array de objetos, então se faz necessário indicar para cada
  // atributo do objeto, o seu tipo
  const [items, setItems] = useState<Item[]>([]);

  // será armazenado um array de strings, podemos informar diretamente
  const [ufs, setufs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  useEffect(() => {
    api.get("items").then((res) => {
      setItems(res.data);
    });
  }, []);

  // retorna os estados
  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((res) => {
        const ufInicials = res.data.map((uf) => {
          return uf.sigla;
        });

        setufs(ufInicials);
      });
  }, []);

  // retorna as cidades de acordo com o UF selecionado
  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((res) => {
        const cityNames = res.data.map((city) => {
          return city.nome;
        });

        setCities(cityNames);
      });
  }, [selectedUf]);

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
    const UF = event.target.value;
    setSelectedUf(UF);
  };
  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const City = event.target.value;
    setSelectedCity(City);
  };

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

                <Map center={[-23.9417804, -46.3720246]} zoom={15}>
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker position={[-23.9417804, -46.3720246]} />
                </Map>

                <div className="form__group">
                  <div className="form__field">
                    <label htmlFor="uf">Estado (UF)</label>
                    <select
                      name="uf"
                      id="uf"
                      onChange={handleSelectUf}
                      value={selectedUf}
                    >
                      <option value="0">Selecione uma UF</option>
                      {ufs.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form__field">
                    <label htmlFor="city">Cidade</label>
                    <select 
                      name="city" 
                      id="city" 
                      onChange={handleSelectCity}
                      value={selectedCity}
                    >
                      <option value="0">Selecione uma cidade</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>

              <fieldset className="form__box">
                <legend>
                  <h2> Itens de coleta </h2>
                </legend>

                <ul className="form__items">
                  {items.map((item) => (
                    <li key={item.id}>
                      <img src={item.image_url} alt={item.name} />
                      <span> {item.name} </span>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <button className="form__submit" type="submit">
                {" "}
                Cadastrar Ponto de coleta{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePoint;
