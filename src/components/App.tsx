import { ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AppRoutes from "./AppRoutes";
import Footer from "./dashboard/footer/Footer";
import Navbar from "./dashboard/navbar/Navbar";
function App() {
  return (
    <>
      <React.StrictMode>
        <ChakraProvider>
          <AuthProvider>
            <Flex direction="column">
              <Router>
                <Navbar />
                <AppRoutes></AppRoutes>
                <Footer />
              </Router>
            </Flex>
          </AuthProvider>
        </ChakraProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
