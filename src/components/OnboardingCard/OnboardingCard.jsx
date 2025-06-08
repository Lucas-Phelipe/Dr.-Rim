import React from "react";
import styles from "./OnboardingCard.module.css";

const OnboardingCard = ({
  image,
  title,
  description,
  buttonText,
  onClick,
  backgroundImage,
}) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={styles.overlay}>
        <img src={image} alt={title} className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{description}</p>
        <button onClick={onClick} className={styles.button}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default OnboardingCard;
