import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import AllChallenges from "./challenges/AllChallenges";
import SingleChallenge from "./challenges/SingleChallenge";
import AllCategories from "./challenges/categories/AllCategories";
import SingleCategory from "./challenges/categories/SingleCategory";
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
import Friends from "./profile/friends/ExploreFriends";
import ExploreFriends from "./profile/friends/ExploreFriends";

const DashboardRoutes = () => {
  return (
    <Flex direction="column" minH="100vh">
      <NavBar />
      <Box p="20px" pb="0">
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
          <Route path="/challenges" element={<AllChallenges />} />
          <Route path="/challenges/:urlId" element={<SingleChallenge />} />
          <Route path="/challenges/categories" element={<AllCategories />} />
          <Route path="/explorefriends" element={<ExploreFriends />} />
          <Route
            path="/challenges/categories/:id"
            element={<SingleCategory />}
          />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
};

export default DashboardRoutes;
