import React from "react";
import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Cookies from "universal-cookie";
import NavBar from "./components/NavBar";
import LogIn from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Latest from "./views/Latest";
import Collection from "./views/Collection";
import History from "./views/History";
import Profile from "./views/Profile";
import Recommend from "./views/Recommend";
import Upload from "./views/Upload";
import Searchpage from "./views/Searchpage";
// import GameList from "./components/GameList";

const cookies = new Cookies();

const MyContext = React.createContext();
// const { Provider } = MyContext;

function App() {
  const navigate = useNavigate();

  const initUid = cookies.get("uid");
  const [uid, setUid] = React.useState(initUid || null);
  const [search, setSearch] = React.useState(null);

  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  };

  const handleLogin = (newUid) => {
    setUid(newUid);
    cookies.set("uid", newUid);
  };

  const handleLogout = () => {
    setUid(null);
    cookies.remove("uid");
  };

  return (
    <Box sx={{ height: 1 }}>
      <NavBar navigate={navigate} uid={uid} onLogout={handleLogout} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/profile" element={<Profile uid={uid} />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/history" element={<History />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<LogIn navigate={navigate} onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/GameList" element={<GameList />} />
        <Route path="/searchPage/:searchParams" element={<Searchpage />} />
      </Routes>
    </Box>
  );
}

export default App;
