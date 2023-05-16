import { configureStore } from "@reduxjs/toolkit";
import allChallengesReducer from "../components/dashboard/challenges/allChallengesSlice";
import allCommitmentsReducer from "../components/dashboard/challenges/allCommitmentsSlice";
import allCategoriesReducer from "../components/dashboard/challenges/categories/allCategoriesSlice";
import singleCategoryReducer from "../components/dashboard/challenges/categories/singleCategorySlice";
import singleChallengeReducer from "../components/dashboard/challenges/singleChallengeSlice";
import singleCommitmentReducer from "../components/dashboard/challenges/singleCommitmentSlice";
import allRewardsReducer from "../components/dashboard/profile/allRewardsSlice";
import singleRewardReducer from "../components/dashboard/profile/singleRewardSlice";
import allReactionsReducer from "../components/dashboard/profile/AllReactionsSlice";
import friendsReducer from "/Users/spak/Desktop/creetures-react/src/components/dashboard/profile/FriendsSlice";
import profilesReducer from '../components/dashboard/profile/Single-All-ProfilesSlice'
// import logger from "redux-logger"; //optional install: npm i --save redux-logger

const store = configureStore({
  reducer: {
    allCategories: allCategoriesReducer,
    allChallenges: allChallengesReducer, //documentation: https://redux-toolkit.js.org/usage/usage-with-typescript
    allCommitments: allCommitmentsReducer,
    allRewards: allRewardsReducer,
    // auth: authReducer,
    // singleProfile: singleProfileReducer,
    singleChallenge: singleChallengeReducer,
    singleCommitment: singleCommitmentReducer,
    singleCategory: singleCategoryReducer,
    singleReward: singleRewardReducer,
    allReactions: allReactionsReducer,
    friends: friendsReducer,
    profiles: profilesReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // if we install the logger, uncomment this line
});

// export * from "../features/auth/authSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
