import { createContext, ReactNode, useEffect, useState } from "react";

interface JWTPayLoad {
   id: string;
}

interface AuthContextType {
   user: JWTPayLoad | null,
   token: string | null,
   login: (token: string) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
   user: null,
   token: null,
   login: () => { },  //! adds token to the localStorgae.
   logout: () => { } //! removes token from the localStorage.
});

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvided = ({ children }: AuthProviderProps) => {
   const [user, setUser] = useState<JWTPayLoad | null>(null);
   const [token, setToken] = useState<string | null>(null);

   useEffect(() => {
      const exisitingToken = localStorage.getItem("token");
      if (exisitingToken) {
         
      }
   })
} 
