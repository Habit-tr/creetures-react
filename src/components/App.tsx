import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { supabase } from "../utils/supabaseClient";
import Auth from "./loginsystem/login/login";
import { AuthProvider } from "../context/AuthContext";
function App() {
  return (
    <>
      <React.StrictMode>
        <AuthProvider>
          <Router>
            <AppRoutes></AppRoutes>
          </Router>
        </AuthProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
