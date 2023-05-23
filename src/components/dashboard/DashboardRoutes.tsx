import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import AllChallenges from "./challenges/AllChallenges";
import SingleChallenge from "./challenges/SingleChallenge";
import AllCategories from "./challenges/categories/AllCategories";
import AllCommitments from "./challenges/commitments/AllCommitments";
import SingleCommitment from "./challenges/commitments/SingleCommitment";
import NavBar from "./components/NavBar";
import Footer from "./footer/Footer";
import FriendsSidebar from "./friends/FriendsSidebar";
import BuddyProfile from "./profile/BuddyProfile";
import CycleTest from "./profile/CycleTest";
import Profile from "./profile/Profile";
import RewardsPage from "./profile/RewardsPage";
import SingleReward from "./profile/SingleReward";
import Friends from "./friends/explore/ExploreFriends";
import ExploreFriends from "./friends/explore/ExploreFriends";

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
          <Route path="/cycle/:day" element={<CycleTest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:buddy_id" element={<BuddyProfile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/buddy" element={<FriendsSidebar />} />
          <Route path="/commitments" element={<AllCommitments />} />
          <Route path="/commitments/:id" element={<SingleCommitment />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/rewards/:urlId" element={<SingleReward />} />
          <Route
            path="/challenges"
            element={<AllChallenges categoryId={categoryId} />}
          />
          <Route path="/challenges/:urlId" element={<SingleChallenge />} />
          <Route path="/challenges/categories" element={<AllCategories />} />
          <Route path="/explorefriends" element={<ExploreFriends />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
};

export default DashboardRoutes;
