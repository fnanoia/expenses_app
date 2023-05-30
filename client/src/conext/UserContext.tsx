import { ReactNode, createContext, useState } from "react";
import { TUserId, TUserToken } from "../types/User";

//context
export const UserContext = createContext({});

//interface for props
interface UserProviderProps {
  children: ReactNode;
}

//context to export
export default function UserProvider({ children }: UserProviderProps) {
  //set user token
  const [userToken, setUserToken] = useState<TUserToken>();

  //set user Id
  const [userId, setUserId] = useState<TUserId>();
  
  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, userId, setUserId }}
    >
      {children}
    </UserContext.Provider>
  );
}
