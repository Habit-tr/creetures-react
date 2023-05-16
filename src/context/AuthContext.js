import React, { useContext, useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  }

  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    setSession(data);
  }

  async function updateProfilePicture(event) {
    event.preventDefault();
    const avatarFile = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("profilePictures")
      .upload(event, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
  }

  async function login(email, password) {
    try {
      const { data, err } = await supabase.auth.signInWithPassword(
        {
          email: email,
          password: password,
        },
        { redirectTo: "http://localhost:3000/" }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut({
      redirectTo: "http://localhost:3000/",
    });
  }

  async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://localhost:3000/",
    });
  }

  async function updateEmail(email) {
    const { data, error } = await supabase.auth.updateUser({ email: email });
  }

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user);
  }

  useEffect(() => {
    getUser();
      getSession();
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    session,
    updateEmail,
    resetPassword,
    updateProfilePicture,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
