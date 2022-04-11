import logo from './logo.svg';
import './App.css';
import Login from './components/authentication/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultPage from './components/defaultPage/Default';
import { Container } from 'react-bootstrap';
import Register from './components/authentication/register/Register';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Details from './components/details/Details';
import SearchPage from './components/search/SearchPage';
import FavouritesPage from './components/favourites/FavouritesPage';
import CastDetail from './components/details/cast/castDetail/CastDetail';
import HistoryPage from './components/history/HistoryPage';


function App() {
  return (
    <BrowserRouter>
      <div className="content-container">
        <Header className="font-link content-container" />
        <Container fluid className="font-link" style={{ paddingBottom: '60px' }}>
          <Routes>
            <Route path='/' element={<DefaultPage mode='default' />} />
            <Route path='/trending' element={<DefaultPage mode='default' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/search' element={<SearchPage mode='search' />} />

            <Route path='/details' element={<Details />}>
              <Route path=":id" element={<Details />} />
              <Route path=":id/:type" element={<Details />} />
            </Route>

            <Route path='/favourites' element={<FavouritesPage />} />

            <Route path='/castDetail' element={<CastDetail />} >
              <Route path=":id" element={<CastDetail />} />
            </Route>

            <Route path='/history' element={<HistoryPage />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
