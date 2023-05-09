import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const user = await login(email, password);
      navigate("/");
    } catch {
      setError("Failed to Login. Check password and try again.");
    }
    setLoading(false);
  }
  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Log In</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 createAccountButton"
              onClick={handleLogin}
              disabled={loading}
            >
              Sign In
            </button>
          </div>
          <div className="w-100 text-center mt-2">
            <Link to="/forgotpassword">
              <button className="forgotPasswordButton">Forgot Password?</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
