import React, { useContext, useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  //   function signup(email, password) {
  //     return createUserWithEmailAndPassword(auth, email, password);
  //   }

  //   function updateProfilePicture(photoUrl) {
  //     return updateProfile(currentUser, { photoURL: photoUrl });
  //   }

  //   function updateDisplayName(fullName) {
  //     return updateProfile(auth.currentUser, { displayName: fullName });
  //   }

  async function login(email, password) {
    try {
      const { data, err } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //   function logout() {
  //     return signOut(auth);
  //   }

  //   function resetPassword(email) {
  //     return sendPasswordResetEmail(auth, email);
  //   }

  //   function updateEmail(email) {
  //     return updateEmailFirebase(currentUser, email);
  //   }

  //   function updatePassword(password) {
  //     return updatePasswordFirebase(currentUser, password);
  //   }
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user);
  }

  useEffect(() => {
    getUser();
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
  
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
