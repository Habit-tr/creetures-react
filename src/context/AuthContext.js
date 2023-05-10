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

  async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  }

  async function getSession() { 
    const { data, error } = await supabase.auth.getSession()
  }

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

    async function logout() {
      const { error } = await supabase.auth.signOut()
    }

    async function resetPassword(email) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://localhost:3000/',
      })
    }

    async function updateEmail(email) {
      const { data, error } = await supabase.auth.updateUser({email: email})
    }

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
    signup,
    logout, 
    getSession, 
    updateEmail, 
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
