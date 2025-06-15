// src/pages/Onboarding.jsx
import React from 'react';
import { useState, useRef } from 'react';
import OnboardingCard from '../../components/OnboardingCard/OnboardingCard';
import comunidadeImg from '../../assets/comunidade.png';
import comunidadeBg from '../../assets/comunidadebg.png';
import rotinaImg from '../../assets/rotina.png';
import rotinaBg from '../../assets/rotinabg.png';
import gamificacaoImg from '../../assets/gamificacao.png';
import gamificacaoBg from '../../assets/gamificacaobg.png';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        const container = scrollRef.current;
        if (container && currentIndex < cards.length - 1) {
            const nextIndex = currentIndex + 1;
            const scrollWidth = container.clientWidth;
            container.scrollTo({
                left: scrollWidth * nextIndex,
                behavior: 'smooth',
            });
            setCurrentIndex(nextIndex);
        }
    };

  const handleFinalStep = () => {
    navigate('/register');
  };

  const cards = [
    {
        image: comunidadeImg,
        title: 'Comunidade',
        description: 'Converse, compartilhe e aprenda com quem vive a mesma realidade da insuficiência renal',
        buttonText: '>',
        backgroundImage: comunidadeBg,
        onClick: handleNext,
    },
    {
        image: rotinaImg,
        title: 'Controle da rotina',
        description: 'Organize seus cuidados diários de forma simples e prática',
        buttonText: '>',
        backgroundImage: rotinaBg,
        onClick: handleNext,
    },
    {
        image: gamificacaoImg,
        title: 'Gamificação',
        description: 'Cuide da saúde de forma leve e divertida',
        buttonText: 'Começar agora',
        backgroundImage: gamificacaoBg,
        onClick: handleFinalStep,
    },
  ];

  return (
    <div ref={scrollRef} style={styles.container}>
      {cards.map((card, index) => (
        <OnboardingCard key={index} {...card} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    width: '100%',
  },
};

export default Onboarding;
