import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddCommitment from "./challenges/AddCommitment";
import AllCategories from "./challenges/AllCategories";
import AllChallenges from "./challenges/AllChallenges";
import RenderMedals from "./challenges/RenderMedals";
import SingleCategory from "./challenges/SingleCategory";
import SingleChallenge from "./challenges/SingleChallenge";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import Profile from "./profile/Profile";
import Rewards from "./profile/Rewards";

const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/medals" element={<RenderMedals />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/challenges" element={<AllChallenges />} />
        <Route path="/challenges/:urlId" element={<SingleChallenge />} />
        <Route path="/challenges/categories" element={<AllCategories />} />
        <Route
          path="/challenges/categories/:name"
          element={<SingleCategory />}
        />
        <Route path="/challenges/:id/commit" element={<AddCommitment />} />
      </Routes>
      <Footer />
    </>
  );
};

export default DashboardRoutes;
