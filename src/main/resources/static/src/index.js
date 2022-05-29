import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Scala40 from './components/Scala40';
import Scopa from './components/Scopa';
import Yahtzee from './components/Yahtzee';
import Gioco24 from './components/Gioco24';
import Burraco from './components/Burraco';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/scala%2040' element={<Scala40 />} />
          <Route path='/scopa' element={<Scopa />} />
          <Route path='/yahtzee' element={<Yahtzee />} />
          <Route path='/24' element={<Gioco24 />} />
          <Route path='/burraco' element={<Burraco/>} />
        </Routes>
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
