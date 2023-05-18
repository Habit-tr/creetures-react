import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import AllChallenges from "./challenges/AllChallenges";
import SingleChallenge from "./challenges/SingleChallenge";
import AllCategories from "./challenges/categories/AllCategories";
import SingleCategory from "./challenges/categories/SingleCategory";
import AddCommitment from "./challenges/commitments/AddCommitment";
import AllCommitments from "./challenges/commitments/AllCommitments";
import SingleCommitment from "./challenges/commitments/SingleCommitment";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import CycleTest from "./profile/CycleTest";
import Friends from "./profile/Friends";
import Profile from "./profile/Profile";
import Rewards from "./profile/Rewards";
import SingleReward from "./profile/SingleReward";

const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Box padding="20px">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cycle/:day" element={<CycleTest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/commitments" element={<AllCommitments />} />
          <Route path="/commitments/:id" element={<SingleCommitment />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/rewards/:urlId" element={<SingleReward />} />
          <Route path="/challenges" element={<AllChallenges />} />
          <Route path="/challenges/:urlId" element={<SingleChallenge />} />
          <Route path="/challenges/categories" element={<AllCategories />} />
          <Route
            path="/challenges/categories/:id"
            element={<SingleCategory />}
          />
          <Route path="/challenges/:id/commit" element={<AddCommitment />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
};

export default DashboardRoutes;
