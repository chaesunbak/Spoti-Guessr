import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/Home/home';
import GameMenu from './pages/GameMenu/gamemenu';
import GamePlay from './pages/GameMenu/GamePlay/gameplay';
import Auth from './pages/Auth/auth';
import "./index.css";
import DataHome from './pages/Data/datahome';
import DataList from './pages/Data/DataList/datalist';
import SingleData from './pages/Data/DataList/SingleData/singledata';
import AddData from './pages/Add/adddata';
import Acount from './pages/Acount/acount';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='game/:gamemode' element={<GameMenu/>}/>
          <Route path='game/:gamemode/:genre' element={<GamePlay/>}/>
          <Route path='data' element={<DataHome/>}/>
          <Route path='data/:gamemode' element={<DataList/>}/>
          <Route path='data/:gamemode/:id' element={<SingleData/>}/>
          <Route path='add' element={<AddData/>}/>
          <Route path='acount' element={<Acount/>}/>
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