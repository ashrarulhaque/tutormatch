import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/customhooks";
import axios, { AxiosError } from "axios";
import { useFlashMessage } from "./FlashMessageContext";
import { CurrentUser } from "../utils/types";

interface AuthContextType {
  user: CurrentUser | null;
  isLoading: boolean;
  isError: boolean;
  isLoggedIn: boolean;
  login: (credential: { email: string; password: string }) => Promise<void>;
  signup: (credential: {name: string; email: string; password: string; gender: string; subjects: string[]; role: string; })=> Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: user, isLoading, isError } = useCurrentUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showFlash } = useFlashMessage();
  
useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await axios.post("http://localhost:5000/api/login", credentials, {
        withCredentials: true,
      });
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      showFlash("Login successful!", "success");
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Login failed. Please try again.";
      showFlash(message, "error");
      navigate("/login");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, {
        withCredentials: true,
      });
      queryClient.setQueryData(["currentUser"], null);
      showFlash("Successfully logged out.", "success");
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Logout failed. Please try again.";
      showFlash(message, "error");
    }
  };

  const signup = async (credential: {name: string; email: string; password: string; gender: string; subjects: string[]; role: string }) => {
    try {
      await axios.post("http://localhost:5000/api/register", credential, {withCredentials: true});
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      showFlash("User registered and login successful!", "success");
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{message: string}>;
      const message = err.response?.data?.message || "Registration failed. Please try again.";
      showFlash(message, "error");
      navigate("/login")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, isError, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};