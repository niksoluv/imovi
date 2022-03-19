import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultPage from './components/defaultPage/Default';
import { Container } from 'react-bootstrap';
import Register from './components/register/Register';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Details from './components/details/Details';
import SearchPage from './components/search/SearchPage';
import FavouritesPage from './components/favourites/FavouritesPage';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container fluid className="font-link">
        <Routes>
          <Route path='/' element={<DefaultPage mode='default' />} />
          <Route path='/trending' element={<DefaultPage mode='default' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<SearchPage mode='search' />} />
          <Route path='/details' element={<Details />} />
          <Route path='/favourites' element={<FavouritesPage />} />
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
