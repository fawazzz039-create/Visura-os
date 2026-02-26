"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
  bio?: string;
}

interface UserStats {
  views: number;
  artworks: number;
  rating: number;
  sales: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  stats: UserStats;
  updateStats: (newStats: Partial<UserStats>) => void;
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
  
  // User statistics
  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window !== "undefined") {
      const storedStats = localStorage.getItem("visura_stats");
      if (storedStats) {
        try {
          return JSON.parse(storedStats) as UserStats;
        } catch (e) {
          localStorage.removeItem("visura_stats");
        }
      }
    }
    return { views: 1200, artworks: 12, rating: 4.8, sales: 8 };
  });

  const updateStats = (newStats: Partial<UserStats>) => {
    setStats(prev => {
      const updated = { ...prev, ...newStats };
      if (typeof window !== "undefined") {
        localStorage.setItem("visura_stats", JSON.stringify(updated));
      }
      return updated;
    });
  };

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

  const register = async (name: string, email: string, password: string, phone: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      phone,
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
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, stats, updateStats }}>
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
