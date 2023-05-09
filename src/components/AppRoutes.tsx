import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Account from "./dashboard/account/account";
import Login from "./loginsystem/login/login";
const AppRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <div>
      <Routes>
        <Route path="/" element={<Account />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
