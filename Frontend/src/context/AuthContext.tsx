import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import API from "../api/API";

interface JWTPayload {
   id: string;
}

interface AuthContextType {
   isAuthenticated: boolean;
   user: JWTPayload | null;
   loading: boolean;
   login: (token: string) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
   isAuthenticated: false,
   user: null,
   loading: false,
   login: () => { },
   logout: () => { }
});

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [user, setUser] = useState<JWTPayload | null>(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
         verifyToken(savedToken);
      } else {
         setLoading(false);
      }
   }, []);

   const verifyToken = async (token: string) => {
      try {
         const response = await API.post(
            "/verify-token",{},
            {
               headers: {
                  Authorization: token
               }
            }
         );
         setUser(response.data);
         setIsAuthenticated(true);
      } catch (error) {
         console.error("Token verification failed:", error);
         logout();
      } finally {
         setLoading(false);
      }
   };

   const login = (token: string) => {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setLoading(false);
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
   };


   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            user,
            loading,
            login,
            logout
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) throw new Error("useAuth must be used inside AuthProvider");
   return context;
};
