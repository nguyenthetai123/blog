import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './compenents/Signup';
import Home from './compenents/Home';
import Active from './compenents/Active';
import Login from './compenents/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route exact path='/activate/:uid/:token' element={<Active/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
