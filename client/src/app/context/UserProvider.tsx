"use client";

import { createContext, useContext } from "react";

interface UserContextType {
  email: string;
  username: string;
  id: string;
  token: string;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserContextType;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
