import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import GameMenu from './pages/gamemenu';
import GamePlay from './pages/gameplay';
import Profile from './pages/Profile/profile';
import Settings from './pages/setting';
import "./index.css";
import useAuthStore from './store/authStore';

function App() {
  const authUser = useAuthStore(state => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path=':gamemode' element={<GameMenu/>}/>
          <Route path=':gamemode/:genre' element={<GamePlay/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='settings' element={<Settings/>}/>
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