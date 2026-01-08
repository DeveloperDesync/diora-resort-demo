"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "guest" | "admin" | "head_admin" | null

export interface User {
  email: string
  role: UserRole
  name: string
  resortIds?: string[] // For admin users - which resorts they manage
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS = [
  { email: "guest@demo.com", password: "demo123", role: "guest" as UserRole, name: "Guest User" },
  {
    email: "admin@malumpati.com",
    password: "admin123",
    role: "admin" as UserRole,
    name: "Malumpati Admin",
    resortIds: ["1"],
  },
  {
    email: "admin@seco.com",
    password: "admin123",
    role: "admin" as UserRole,
    name: "Seco Island Admin",
    resortIds: ["2"],
  },
  {
    email: "admin@nogas.com",
    password: "admin123",
    role: "admin" as UserRole,
    name: "Nogas Island Admin",
    resortIds: ["3"],
  },
  {
    email: "headadmin@diora.com",
    password: "head123",
    role: "head_admin" as UserRole,
    name: "Head Administrator",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem("diora_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const userData: User = {
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
        resortIds: foundUser.resortIds,
      }
      setUser(userData)
      localStorage.setItem("diora_user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("diora_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
