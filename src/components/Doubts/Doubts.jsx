import React, { useState } from 'react';
import styles from './Doubts.module.css';

const questions = [
  'O que acontece após a doação?',
  'Quem pode doar?',
  'Quem não pode doar?',
  'Qual o intervalo das doações?',
  'Doar sangue é seguro?',
  'É cobrado pelo sangue doado?',
];

const answers = [
  'Depois da doação, o candidato é observado no próprio serviço por algum tempo, recebe orientações para que evite esforços físicos naquele dia, para que se alimente bem, especialmente ingerindo líquidos, recebe um lanche e é liberado. Ele é ainda orientado para retornar em alguns dias para buscar os resultados dos exames que foram realizados. Além disso, ele é orientado a comunicar ao serviço de hemoterapia onde doou sangue, qualquer manifestação sugestiva de infecção (febre, diarreia, dor de cabeça, dor no corpo, mal-estar, dor de garganta, tosse, manifestações respiratórias, entre outras) que apresente nos 14 dias que sucedem a doação de sangue.',
  'Em princípio, podemos dizer que todos podemos nos candidatar a ser doadores de sangue. Entretanto, nossa aceitação depende de uma série de fatores que levam em conta o risco que aquela doação pode representar para a saúde do próprio candidato e para a saúde do indivíduo que vier a receber o sangue doado.',
  '» tiver idade inferior a 16 anos ou superior a 69 anos. Obs.: o limite superior para a primeira doação é 60 anos. Quem tem 61 anos ou mais e nunca doou está inapto. \n» tiver peso inferior a 50 quilos.\n» estiver com anemia no teste realizado imediatamente antes da doação.\n» estiver com hipertensão ou hipotensão arterial no momento da doação.\n» estiver com aumento ou diminuição dos batimentos cardíacos no momento da doação.\n» estiver com febre no dia da doação.\n» estiver grávida.\n» estiver amamentando, a menos que o parto tenha ocorrido há mais de 12 meses.',
  'O intervalo para doação de sangue convencional para homens é 60 dias e para mulheres é 90 dias. Entretanto, recomenda-se que o homem doe até 4 vezes por ano e a mulher até 3 vezes por ano.',
  'Sim, doar sangue é seguro. Não existe nenhum risco de contrair uma doença infecciosa doando sangue. Entretanto, existe um pequeno risco de que o doador possa sentir algum mal-estar durante ou logo após a doação, especialmente nas primeiras vezes que ele doa, porém, os serviços se preocupam com isto e observam e cuidam para que os doadores nada sintam ou se sentirem, para que sejam bem assistidos.',
  'Não, o sangue doado não é cobrado. No entanto, existe um custo para que o sangue obtido do doador esteja em condições de uso no paciente. Ele precisa ser colhido (ex.: material descartável, recursos humanos), fracionado em seus componentes (ex.: insumos e equipamentos específicos, recursos humanos), testado por meio de diversos exames (ex.: insumos e equipamentos específicos, recursos humanos), armazenado (ex.: custos da cadeia do frio), distribuído e compatibilizado por meio de testes laboratoriais para cada paciente que dele necessita. Nos serviços públicos de saúde, estes custos são cobertos pelo SUS.',
];

const Doubts = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.doubts}>
      {questions.map((question, index) => (
        <div
          key={index}
          className="card rounded-0 shadow-none"
          onClick={() => toggleQuestion(index)}
        >
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ height: '70px' }}
          >
            <span>{question}</span>
            <span>
              {openIndex === index ? '-' : <i className="bi bi-chevron-compact-down" style={{ fontSize: '12px' }}></i>}
            </span>
          </div>
          {openIndex === index && (
            <div className="card-body">
              <p className="mb-0">{answers[index]}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Doubts;