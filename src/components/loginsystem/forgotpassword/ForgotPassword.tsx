import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Alert,
  AlertIcon,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const ForgotPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  async function handleForgotPassword(e: any) {
    e.preventDefault();
    try {
      const user = await resetPassword(forgotPasswordEmail);
      setError("Check your email!");
      await navigate("/");
    } catch {
      setError("Failure sending password email, check email and try again.");
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Forgot Password?</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                onChange={(e: any) => {
                  setForgotPasswordEmail(e.target.value);
                }}
              />
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>
              <Button
                onClick={handleForgotPassword}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Send password reset email
              </Button>
              {error && (
                <Alert status="warning">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
