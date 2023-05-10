import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddCommitment from './challenges/AddCommitment';
import AllCategories from './challenges/AllCategories';
import AllChallenges from './challenges/AllChallenges';
import EditChallenge from './challenges/EditChallenge';
import SingleCategory from './challenges/SingleCategory';
import SingleChallenge from './challenges/SingleChallenge';
import Profile from './profile/Profile';
import Rewards from './profile/Rewards';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/challenges" element={<AllChallenges />} />
        <Route path="/challenges/:id" element={<SingleChallenge />} />
        <Route path="/challenges/edit" element={<EditChallenge />} />
        <Route path="/challenges/categories" element={<AllCategories />} />
        <Route path="/challenges/categories/:name" element={<SingleCategory />} />
        <Route path="/challenges/:id/commit" element={<AddCommitment />} />
      </Routes>
      <Footer />
    </>
  )
};

export default DashboardRoutes;
