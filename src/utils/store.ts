import { configureStore } from "@reduxjs/toolkit";
import addCommitmentReducer from "../components/dashboard/challenges/commitments/addCommitmentSlice";
import allCategoriesReducer from "../components/dashboard/challenges/categories/allCategoriesSlice";
import allChallengesReducer from "../components/dashboard/challenges/allChallengesSlice";
import allCommitmentsReducer from "../components/dashboard/challenges/commitments/allCommitmentsSlice";
import allReactionsReducer from "../components/dashboard/profile/AllReactionsSlice";
import allRewardsReducer from "../components/dashboard/profile/allRewardsSlice";
import friendsReducer from "../components/dashboard/profile/friends/FriendsSlice";
import profilesReducer from "../components/dashboard/profile/Single-All-ProfilesSlice";
// import sharedUsersReducer from "../components/dashboard/profile/friends/sharedUsersSlice";
import singleCategoryReducer from "../components/dashboard/challenges/categories/singleCategorySlice";
import singleChallengeReducer from "../components/dashboard/challenges/singleChallengeSlice";
import singleCommitmentReducer from "../components/dashboard/challenges/commitments/singleCommitmentSlice";
import singleRewardReducer from "../components/dashboard/profile/singleRewardSlice";
import allEarnedRewardsReducer from "../components/dashboard/profile/allEarnedRewardsSlice";
// import logger from "redux-logger"; //optional install: npm i --save redux-logger

const store = configureStore({
  reducer: {
    allCategories: allCategoriesReducer,
    allChallenges: allChallengesReducer, //documentation: https://redux-toolkit.js.org/usage/usage-with-typescript
    allCommitments: allCommitmentsReducer,
    allReactions: allReactionsReducer,
    allRewards: allRewardsReducer,
    // auth: authReducer,
    commitmentChallengeIds: addCommitmentReducer,
    friends: friendsReducer,
    profiles: profilesReducer,
    // sharedUsers: sharedUsersReducer,
    allEarnedRewards: allEarnedRewardsReducer,
    singleCategory: singleCategoryReducer,
    singleChallenge: singleChallengeReducer,
    singleCommitment: singleCommitmentReducer,
    singleReward: singleRewardReducer,
    // singleProfile: singleProfileReducer,

  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // if we install the logger, uncomment this line
});

// export * from "../features/auth/authSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
