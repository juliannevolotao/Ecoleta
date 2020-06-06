import React, { useEffect, useState } from "react";

import "./styles.scss";
import { FiFrown } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

import { useParams, useHistory, Link } from "react-router-dom";

import api from "../../services/api";

import ModalInfo from "../../components/ModalInfo";

interface points {
  id: number;
  city: string;
  email: string;
  image: string;
  latitude: number;
  longitude: number;
  name: string;
  uf: string;
  whatsapp: string;
}

const ListPoints = () => {
  const [points, setPoints] = useState<points[]>([]);
  const [hasPoints, setHasPoints] = useState<boolean>(true);
  const [messageError, setMessageError] = useState<string>("");

  let history = useHistory();
  const { uf, city } = useParams();

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await api.get(`/points/filter?uf=${uf}&city=${city}`);
        console.log(response)
        setPoints(response.data);
      } catch (err) {
        if (err?.response.status === 404) {
          setMessageError("Não há pontos cadastrados nessa região.");
          setHasPoints(false);
          return setTimeout(() => {
            history.push("/");
          }, 3000);
        }

        setMessageError("Algum erro interno ocorreu.");
        return setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    };

    fetchPoints();
  }, [history]);

  return (
    <>
      {!hasPoints && (
        <ModalInfo>
          <FiFrown />
          <h2> Sinto muito! </h2>
          <p> {messageError} </p>
        </ModalInfo>
      )}
      <div className="list__container">
        <div className="list__content">
          <div className="list__menu">
            <img src={logoImg} alt="Ecoleta" />
            <Link to="/" className="list__button">
              <FiArrowLeft />
              <span> Voltar para home </span>
            </Link>
          </div>

          <div className="list__background"></div>

          <div className="list__body">
            <p> <b> {points.length} pontos </b> encontrados </p>

            <div className="list__points">
              {points.map((point) => (
                <div key={point.id} className="list__point">
                  <div className="point__image">
                    <img src={point.image} alt={point.name} />
                  </div>
                  <h3> {point.name} </h3>
                  <h4> Resíduos Eletrônicos, Lâmpadas </h4>
                  <p> {point.city}, {point.uf} </p>
                  <p> Guilherme Gemballa, Jardim América </p>
                  <p> N° 260 </p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPoints;
