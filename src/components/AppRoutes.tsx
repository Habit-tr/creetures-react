import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Account from "./dashboard/account/Account";
import AddChallenge from "./dashboard/challenges/AddChallenge";
import AllChallenges from "./dashboard/challenges/AllChallenges";
import SingleChallenge from "./dashboard/challenges/SingleChallenge";
import Login from "./loginsystem/login/login";
const AppRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <div>
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/challenges" element={<AllChallenges />} />
        <Route path="/challenges/:id" element={<SingleChallenge />} />
        <Route path="/challenges/add" element={<AddChallenge />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
