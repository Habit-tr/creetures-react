import { configureStore } from "@reduxjs/toolkit";
import allCategoriesReducer from "../components/dashboard/challenges/allCategoriesSlice";
import allChallengesReducer from "../components/dashboard/challenges/allChallengesSlice";
import allCommitmentsReducer from "../components/dashboard/challenges/allCommitmentsSlice";
import allRewardsReducer from "../components/dashboard/profile/allRewardsSlice";
import singleChallengeReducer from "../components/dashboard/challenges/singleChallengeSlice";
import singleCommitmentReducer from '../components/dashboard/challenges/singleCommitmentSlice';
import singleRewardReducer from "../components/dashboard/profile/singleRewardSlice";
// import logger from "redux-logger"; //optional install: npm i --save redux-logger

const store = configureStore({
  reducer: {
    allCategories: allCategoriesReducer,
    allChallenges: allChallengesReducer, //documentation: https://redux-toolkit.js.org/usage/usage-with-typescript
    allCommitments: allCommitmentsReducer,
    allRewards: allRewardsReducer,
    // auth: authReducer,
    singleChallenge: singleChallengeReducer,
    singleCommitment: singleCommitmentReducer,
    singleReward: singleRewardReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // if we install the logger, uncomment this line
});

// export * from "../features/auth/authSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
