import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultPage from './components/defaultPage/Default';
import { Container } from 'react-bootstrap';
import Register from './components/register/Register';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';


function App() {
  return (
    <BrowserRouter>
      <Container >
        <Header />
        <Routes>
          <Route path='/' element={<DefaultPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
