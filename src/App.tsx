import './App.css'
import AuthPage from './pages/AuthPage';
import ScrapPage from './pages/ScrapPage';
import Header from './components/common/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<AuthPage/>}></Route>
          <Route path='/login' element={<AuthPage/>}></Route>
          <Route path='/scrap' element={<ScrapPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
