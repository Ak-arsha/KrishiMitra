"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser, googleLoginUser } from "@/lib/api";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  location_name: string;
  latitude: number;
  longitude: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (email?: string, name?: string) => Promise<void>;
  register: (email: string, password: string, full_name: string, role: string, location: string, lat: number, lng: number) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      const data = response.data;
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("farmer", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      const detail = error.response?.data?.detail;
      const message = typeof detail === "string" ? detail : (Array.isArray(detail) ? detail[0]?.msg : "Login failed. Please check backend connection.");
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (customEmail?: string, customName?: string) => {
    setIsLoading(true);
    try {
      const email = customEmail || "google.user@example.com";
      const full_name = customName || "Google Account User";
      const response = await googleLoginUser({ email, full_name });
      const data = response.data;
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("farmer", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google login error:", error);
      const detail = error.response?.data?.detail;
      const message = typeof detail === "string" ? detail : "Google Sign In failed. Please try again.";
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    full_name: string,
    role: string,
    location: string,
    lat: number,
    lng: number
  ) => {
    setIsLoading(true);
    try {
      const response = await registerUser({
        email,
        password,
        full_name,
        role,
        location_name: location,
        latitude: lat,
        longitude: lng,
      });
      const data = response.data;
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("farmer", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      const detail = error.response?.data?.detail;
      const message = typeof detail === "string" ? detail : (Array.isArray(detail) ? detail[0]?.msg : "Registration failed. Please try again.");
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("farmer");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithGoogle, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
