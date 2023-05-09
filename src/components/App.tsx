import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AppRoutes from "./AppRoutes";
function App() {
  return (
    <>
      <React.StrictMode>
        <ChakraProvider>
          <AuthProvider>
            <Router>
              <AppRoutes></AppRoutes>
            </Router>
          </AuthProvider>
        </ChakraProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
