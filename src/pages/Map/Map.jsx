import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Homebar from "../../components/Homebar/Homebar"
import axios from "axios";
import styles from "./Map.module.css";
  
const Map = () => {
  

  return (
    <div className={styles.pageBackground}>
      <header className={styles.header}>
          <h2>Dúvidas</h2>
          <img className={styles.profilePic} src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"alt="Perfil"/>
      </header>

      

      <div className={styles.topicSection}>
          <h2 className={styles.topicTitle}>Hemodiálise</h2>
          <div className={styles.doubt}><h3 className={styles.doubtText}>Quanto tempo dura uma sessão de hemodiálise?</h3></div>
          <div className={styles.line} />
          <h2 className={styles.topicTitle}>Nutrição</h2>
          <div className={styles.doubt}><h3 className={styles.doubtText}>Quais alimentos devo evitar?</h3></div>

      </div>

      <Homebar/>
    </div>
      

  );
};

export default Map;
