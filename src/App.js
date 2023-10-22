import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./component/Signup";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./component/ProfilePage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
