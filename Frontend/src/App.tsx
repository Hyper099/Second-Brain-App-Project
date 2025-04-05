
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthPages from './pages/AuthPages';
import DashBoard from "./pages/DashBoard";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPages />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
