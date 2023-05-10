import { configureStore } from "@reduxjs/toolkit";
import allChallengesSlice from "../components/dashboard/challenges/allChallengesSlice";
// import logger from "redux-logger"; //optional install: npm i --save redux-logger

const store = configureStore({
  reducer: {
    allChallenges: allChallengesSlice, //documentation: https://redux-toolkit.js.org/usage/usage-with-typescript
    // auth: authReducer,
    // allCategories: allCategoriesReducer,
    // singleChallenge: singleChallengeReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // if we install the logger, uncomment this line
});

// export * from "../features/auth/authSlice";

export type RootState = ReturnType<typeof store.getState>;

export default store;
