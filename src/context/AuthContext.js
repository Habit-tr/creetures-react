import React, { useContext, useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
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

    async function updateProfilePicture(event) {
      const avatarFile = event.target.files[0]
      const { data, error } = await supabase
        .storage
        .from('avatars')
        .upload('public/avatar1.png', avatarFile, {
          cacheControl: '3600',
          upsert: false
        })
    }

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
    resetPassword, 
    updateProfilePicture
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
