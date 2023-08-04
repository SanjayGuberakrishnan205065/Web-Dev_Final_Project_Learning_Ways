import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/comman/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";

import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex-col font-inter">
    <Navbar/>
    <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="courses/:courseId" element={<CourseDetails />} /> */}
        {/* <Route path="catalog/:catalogName" element={<Catalog />} /> */}


      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

          <Route
          path="login"
          element={
            <OpenRoute>
             <Login/>
            </OpenRoute>
          }
        />  
        

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
            <ForgotPassword/>
            </OpenRoute>
          }
        />  
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
          <UpdatePassword/>
            </OpenRoute>
          }
        />  
    </Routes>

    </div>
  );
}

export default App;
