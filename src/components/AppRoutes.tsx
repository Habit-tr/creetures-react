import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardRoutes from "./dashboard/DashboardRoutes";
import Login from "./loginsystem/login/login";
import Home from "./loginsystem/home/home";
import SignUp from "./loginsystem/signup/Signup";

const AppRoutes = () => {
  const { currentUser } = useAuth();
  const { session } = useAuth();
  console.log(session);

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
      </Routes>
    </Box>
  );
};

export default AppRoutes;
