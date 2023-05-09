import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./dashboard/Dashboard";
import AddChallenge from "./dashboard/challenges/AddChallenge";
import AllChallenges from "./dashboard/challenges/AllChallenges";
import EditChallenge from "./dashboard/challenges/EditChallenge";
import SingleChallenge from "./dashboard/challenges/SingleChallenge";
import Profile from "./dashboard/profile/Profile";
import Rewards from "./dashboard/profile/Rewards";
import Login from "./loginsystem/login/login";
const AppRoutes = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser ? (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/challenges" element={<AllChallenges />} />
        <Route path="/challenges/:id" element={<SingleChallenge />} />
        <Route path="/challenges/add" element={<AddChallenge />} />
        <Route path="/challenges/edit" element={<EditChallenge />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
