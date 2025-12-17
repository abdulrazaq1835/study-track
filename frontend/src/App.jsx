import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
   <div>
    <Navbar/>
    
  <Routes>
  <Route path="/" element={<Dashboard/>}>HOME</Route>
  
  </Routes>
  
   </div>
  )
}