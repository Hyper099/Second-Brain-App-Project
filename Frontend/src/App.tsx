import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import AuthPages from './pages/AuthPages';
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Analytics/>
          <Route path="/" element={<AuthPages />} />
          <Route path="/login" element={<AuthPages/>}/>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
            } />
        </Routes>
      </AuthProvider>
    
    </BrowserRouter>
  )
}

export default App
