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
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/profile/Profile';

function App() {
  const background = useSelector((state) => {
    return state.background.backgroundColor
  })

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className={`content-container ${background}`}>
        <Header className="font-link content-container" />
        <Container fluid className="font-link p-0">
          <Routes>
            <Route path='/' element={<DefaultPage mode='default' />} />
            <Route path='/trending' element={<DefaultPage mode='default' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/search' element={<SearchPage mode='search' />} />
            <Route path='/profile' element={<Profile />} />

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
