import React from "react";
import { useAuth } from "../../../context/AuthContext";
const Account = () => {
  const { currentUser } = useAuth();
  return <div>{`${currentUser.email}`}</div>;
};

export default Account;
