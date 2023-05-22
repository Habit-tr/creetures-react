import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../utils/supabaseClient";
import "./signup.css";

const SignUp = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (password.length < 6) {
      return setError("Passwords must be 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      const user = await signup(email, password);
      console.log("user: ", user);
      const { data: profile } = await supabase
        .from("profiles")
        .update({
          email: email,
          username: username,
          full_name: fullName,
          avatar_url: `https://gravatar.com/avatar/0b4f0855a2606cd1f9f583c4c837a66c?s=400&d=robohash&r=x`,
        })
        .eq("id", user.user.id)
        .select();
      console.log("profile: ", profile);
      if (user) {
        toast({
          title: "Account created successfully. Please log in.",
        });
      }
      navigate("/login");
    } catch (error) {
      setError("Failed to create an account ");
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {error && (
        <Alert status="warning">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up for your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="username">
              <FormLabel>Username:</FormLabel>
              <Input
                type="username"
                onChange={(e: any) => {
                  setUsername(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="fullName">
              <FormLabel>Full Name:</FormLabel>
              <Input
                type="fullName"
                onChange={(e: any) => {
                  setFullName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password (6 characters minimum)</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="Confirm Password">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link href="/forgotpassword" color={"blue.400"}>
                  Forgot password?
                </Link>
                <Link href="/login" color={"blue.400"}>
                  Already have an account?
                </Link>
              </Stack>
              <Button
                onClick={handleSignUp}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up!
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
