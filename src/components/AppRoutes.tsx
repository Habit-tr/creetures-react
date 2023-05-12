import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardRoutes from "./dashboard/DashboardRoutes";
import Login from "./loginsystem/login/login";
import Home from "./loginsystem/home/home";
import SignUp from "./loginsystem/signup/Signup";
import ForgotPassword from "./loginsystem/forgotpassword/ForgotPassword";

const AppRoutes = () => {
  const { currentUser } = useAuth();
  const { session } = useAuth();

  return session.session ? (
    <Box>
      <DashboardRoutes />
    </Box>
  ) : (
    <Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
