# tarefas 


# import 'bootstrap/dist/css/bootstrap.min.css'; estilos do bootstrap
# !important = ordem de importancia, tira a prioridade do bootstrap e joga na propriedade que vc colocou
# hi guts
# oi
# oi'

1- import { useNavigate } from 'react-router-dom';

2 - const navigate = useNavigate()

3 - const handleFaq = () => {
  navigate('/perfil');
};
  
3 - onClick={handleFaq}


<!-- <header
        className={classNames(
          styles.header, 
          "d-flex", 
          "align-items-center", 
          "justify-content-between", 
          "text-white", 
          "p-3"
        )}
      >
        <i className="bi bi-arrow-left-short pointer" style={{ fontSize: '36px', cursor: 'pointer'}} onClick={handleBackHome}></i>
        <h2>Comunidade</h2>
        <i></i>
</header> -->

se logar e der certo tem que guardar que estou logado no cookie do navegador, guarda o id da pessoa que estava logada no navegador


Sempre que quiser usar os dados do usuario passo ->>>>>
1 - criar variaveis para cada dado na pagina que for usar ela
2 - pegar o email do cookie
3 - fazer uma chamada http usando o email do usuario pra receber como resposta todos os seus dados 
4 - com a resposta basta salvar cada dado dele na variavel que criei
5 - a partir dai é só botar a variavel que eu criei aonde eu quiser que o dado apareca

estilos padrao btn

    background-color: #BC2C23;
    margin-top: 40px;
    cursor: not-allowed;
    width: 100%;
    font-size: 23px;
    border-bottom: 10px solid #8A1A12;