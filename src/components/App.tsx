import { ChakraProvider, Flex, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import store from "../utils/store";
import theme from "../utils/theme";
import AppRoutes from "./AppRoutes";
function App() {
  return (
    <>
      <React.StrictMode>
        <ChakraProvider
          theme={theme}
          toastOptions={{
            defaultOptions: {
              status: "info",
              position: "top-right",
              duration: 9000,
              isClosable: true,
            },
          }}
        >
          <Provider store={store}>
            <AuthProvider>
              <Flex direction="column">
                <Router>
                  <AppRoutes />
                </Router>
              </Flex>
            </AuthProvider>
          </Provider>
        </ChakraProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
