import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/Home/home';
import GameMenu from './pages/GameMenu/gamemenu';
import GamePlay from './pages/GameMenu/GamePlay/gameplay';
import Profile from './pages/Profile/profile';
import Settings from './pages/Settings/settings';
import Auth from './pages/Auth/auth';
import "./index.css";
import Admin from './pages/Admin/admin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path=':gamemode' element={<GameMenu/>}/>
          <Route path=':gamemode/:genre' element={<GamePlay/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='settings' element={<Settings/>}/>
          <Route path='auth' element={<Auth/>}/>
          <Route path='admin' element={<Admin />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);