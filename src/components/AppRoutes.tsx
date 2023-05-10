import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardRoutes from "./dashboard/DashboardRoutes";
import Login from "./loginsystem/login/login";

 const AppRoutes =  () => {
  const { currentUser } = useAuth();
   const { session } =  useAuth();
  console.log(session);

  return session.session ? (
    <Box>
      <DashboardRoutes />
    </Box>
  ) : (
    <Box>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
