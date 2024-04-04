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
import Data from './pages/Data/data';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='game/:gamemode' element={<GameMenu/>}/>
          <Route path='game/:gamemode/:genre' element={<GamePlay/>}/>
          <Route path='data/:gamemode/:id' element={<Data/>}/>
          <Route path='add' element={<Admin/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='settings' element={<Settings/>}/>
          <Route path='auth' element={<Auth/>}/>
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