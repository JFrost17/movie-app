import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import { Container } from '@mui/system';
import Trending from './Pages/Trending/Trending';
import Shows from './Pages/Shows/Shows';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="App">
      <Container>
        <Routes>
          <Route path='/' element={<Trending/>} exact/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/shows' element={<Shows/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
