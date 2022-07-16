import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './pages/home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Details from './pages/details';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
  <Route path="/:id" element={<Details />} />
    <Route path="/"  element={<App />} exact />
  </Routes>
</BrowserRouter>
);
