import React, { createContext, useContext, useState } from "react";

interface User {
  name?: string;
  phone_number?: string;
  code?: string;
  pin? : string;
  ktp_photo?: string;
  ktp_data?: {
    originalWidth? : number;
    originalHeight? : number;
    width?: number;
    height?: number; 
  };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
