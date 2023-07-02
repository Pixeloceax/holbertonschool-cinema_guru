import React from "react";

import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";
import HomePage from "./HomePage";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  return (
    <BrowserRouter>
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      <SideBar userUsername={userUsername} />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/" element={<Navigate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Dashboard;
