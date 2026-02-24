"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("visura_user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser) as User;
        } catch (e) {
          localStorage.removeItem("visura_user");
        }
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - in production, this would call your backend
    setIsLoading(true);
    
    // Demo: accept any email/password combo
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
    };
    
    setUser(mockUser);
    localStorage.setItem("visura_user", JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    };
    
    setUser(newUser);
    localStorage.setItem("visura_user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("visura_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
