import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Homebar from "../../components/Homebar/Homebar"
import axios from "axios";
import styles from "./Map.module.css";

// Função para atualizar o mapa quando a localização for alterada
function UpdateMap({ position }) {
  const map = useMap();
  if (position) {
    map.setView(position, 13); // Atualiza a visualização do mapa com a nova posição
  }
  return null;
}

const Map = () => {
  const [cep, setCep] = useState("");
  const [location, setLocation] = useState([0, 0]); // Posição inicial padrão
  const [error, setError] = useState("");

  // Estilizando o marcador (ícone)
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [20, 30],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  // Função para buscar o CEP e atualizar a localização
  const buscarLocalizacao = async () => {
    if (!cep) {
      setError("Por favor, insira um CEP.");
      return;
    }

    try {
      // Usando a API ViaCEP para buscar o endereço
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { lat, lon } = await obterCoordenadas(response.data.logradouro, response.data.localidade);

      if (lat && lon) {
        setLocation([lat, lon]);
        setError(""); // Limpa o erro, se houver
      } else {
        setError("Não foi possível encontrar as coordenadas para este CEP.");
      }
    } catch (error) {
      setError("Erro ao buscar o CEP.");
    }
  };

  // Função para buscar as coordenadas a partir do endereço
  const obterCoordenadas = async (logradouro, cidade) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${logradouro}, ${cidade}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      }
      return {};
    } catch (error) {
      return {};
    }
  };

  return (
    <div className={styles.mapContainer}>
      {/* Mapa */}
      <div className={styles.map}>
        <MapContainer center={location} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <UpdateMap position={location} />
          <Marker position={location} icon={customIcon}>
            <Popup>Local: {location[0]}, {location[1]}</Popup>
          </Marker>
        </MapContainer>
      </div>
       {/* Campo de CEP */}
      <div className={styles.searchBox}>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Informe seu CEP..."
          className={styles.searchInput}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button onClick={buscarLocalizacao} className={styles.searchButton}>
          Buscar
        </button>
      </div>
      <Homebar/>
    </div>
  );
};

export default Map;
