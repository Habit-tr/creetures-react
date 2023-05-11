import { configureStore } from "@reduxjs/toolkit";
import allChallengesReducer from "../components/dashboard/challenges/allChallengesSlice";
import allCommitmentsReducer from '../components/dashboard/challenges/allCommitmentsSlice';
import singleChallengeReducer from "../components/dashboard/challenges/singleChallengeSlice";
import allRewardsReducer from "../components/dashboard/challenges/allRewardsSlice";
// import logger from "redux-logger"; //optional install: npm i --save redux-logger

const store = configureStore({
  reducer: {
    allChallenges: allChallengesReducer, //documentation: https://redux-toolkit.js.org/usage/usage-with-typescript
    allCommitments: allCommitmentsReducer,
    // auth: authReducer,
    // allCategories: allCategoriesReducer,
    singleChallenge: singleChallengeReducer,
    allRewards: allRewardsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // if we install the logger, uncomment this line
});

// export * from "../features/auth/authSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
