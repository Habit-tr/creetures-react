import React from "react";
import { useAuth } from "../../../context/AuthContext";
const Account = () => {
    const {currentUser} = useAuth(); 
  return <div>{`${currentUser}`}</div>;
};

export default Account;
