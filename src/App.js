import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

import Doubts from "./components/Doubts/Doubts";
import FaqPage from "./pages/FaqPage/FaqPage";
import SignUp from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";

import Quiz from './pages/Quiz/Quiz';
import ResultQuiz from './pages/ResultQuiz/ResultQuiz';
import Comunity from "./pages/Comunity/Community";
import Comunidade from "./pages/Comunidade/Comunidade"
import Forum from "./pages/Forum/Forum"
import Post from "./pages/Post/Post"
import Comments from "./pages/Comments/Comments"


import Profile from "./pages/Profile/Profile"
import Dados from "./pages/Profile/DataUser/DataUser"
import Certified from "./pages/Profile/Certified/Certified"
import Login from "./pages/Login/Login"
import RouteBloodCenter from "./components/RouteBloodCenter/RouteBloodCenter";
import Enterprise from "./pages/Enterprise/Enterprise";
import Recomendation from "./pages/Recomendation/Recomendation";
import QuizBloodinho from "./pages/Quiz/ApresentationQuiz/ApresentationQuiz";
import Water from "./pages/Water/Water";

import PathOne from "./pages/Path/PathOne/PathOne"
import PathTwo from "./pages/Path/PathTwo/PathTwo"
import PathThree from "./pages/Path/PathThree/PathThree"
import PathFour from "./pages/Path/PathFour/PathFour"
import PathFive from "./pages/Path/PathFive/PathFive"
import PathSix from "./pages/Path/PathSix/PathSix"
import Chat from "./pages/Chat/Chat"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} /> {/* Página inicial */}
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/register" element={<Register />} />

        <Route path="/cadastro" element={<SignUp />} /> 
        <Route path="/login" element={<Login />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/mapa" element={<Map />} />
        <Route path="/community" element={<Comunity />} />
        <Route path="/comunidade" element={<Comunidade />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/posts/:postId" element={<Comments />} />



        <Route path="/hemocentros" element={<RouteBloodCenter />} />
        <Route path="/recomendacoes" element={<Recomendation />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/water" element={<Water />} />
      </Routes>
      
      <Routes>
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/quizBloodinho" element={<QuizBloodinho />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/resultadoquiz" element={<ResultQuiz />} />
      </Routes>

      <Routes>
          <Route path="/perfil" element={<Profile />} />
          <Route path="perfil/dados" element={<Dados />} />
          <Route path="perfil/certificados" element={<Certified />} />
          <Route path="perfil/faq" element={<FaqPage />} />
      </Routes>

      <Routes>
          <Route path="/pathOne" element={<PathOne />} />
          <Route path="/pathTwo" element={<PathTwo />} />
          <Route path="/pathThree" element={<PathThree />} />
          <Route path="/pathFour" element={<PathFour />} />
          <Route path="/pathFive" element={<PathFive />} />
          <Route path="/pathSix" element={<PathSix />} />
      </Routes>
    </Router>
  );
}

export default App;
