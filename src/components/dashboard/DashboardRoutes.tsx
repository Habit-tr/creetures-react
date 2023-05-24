import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import AllChallenges from "./challenges/AllChallenges";
import SingleChallenge from "./challenges/SingleChallenge";
import AllCategories from "./challenges/categories/AllCategories";
import SingleCommitment from "./challenges/commitments/SingleCommitment";
import NavBar from "./components/NavBar";
import Footer from "./footer/Footer";
import BuddyProfile from "./profile/BuddyProfile";
import Profile from "./profile/Profile";
import RewardsPage from "./profile/RewardsPage";
import SingleReward from "./profile/SingleReward";

const DashboardRoutes = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = parseInt(searchParams.get("categoryId") || "0", 10);

  return (
    <Flex direction="column" minH="100vh">
      <NavBar />
      <Box p="20px">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:buddy_id" element={<BuddyProfile />} />
          <Route path="/commitments/:id" element={<SingleCommitment />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/rewards/:urlId" element={<SingleReward />} />
          <Route
            path="/challenges"
            element={<AllChallenges categoryId={categoryId} />}
          />
          <Route path="/challenges/:urlId" element={<SingleChallenge />} />
          <Route path="/challenges/categories" element={<AllCategories />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
};

export default DashboardRoutes;
