import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./dashboard/Dashboard";
import AddCommitment from "./dashboard/challenges/AddCommitment";
import AllCategories from "./dashboard/challenges/AllCategories";
import AllChallenges from "./dashboard/challenges/AllChallenges";
import EditChallenge from "./dashboard/challenges/EditChallenge";
import SingleCategory from "./dashboard/challenges/SingleCategory";
import SingleChallenge from "./dashboard/challenges/SingleChallenge";
import Profile from "./dashboard/profile/Profile";
import Rewards from "./dashboard/profile/Rewards";
import Login from "./loginsystem/login/login";
const AppRoutes = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser ? (
    <Box>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/challenges" element={<AllChallenges />} />
        <Route path="/challenges/:id" element={<SingleChallenge />} />
        <Route path="/challenges/edit" element={<EditChallenge />} />
        <Route path="/challenges/categories" element={<AllCategories />} />
        <Route
          path="/challenges/categories/:name"
          element={<SingleCategory />}
        />
        <Route path="/challenges/:id/commit" element={<AddCommitment />} />
      </Routes>
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
