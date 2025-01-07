import './scss/main.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";
import Pizzas from "./pages/pizzas_pages/Pizzas";
import Contact from "./pages/Contact";
import About from "./pages/About";

import SignUp from './pages/auth_pages/SignUp';
import ConfirmSignup from './pages/auth_pages/ConfirmSignup';
import SignIn from './pages/auth_pages/SignIn';
import ResetPassword from './pages/auth_pages/ResetPassword';
import ResetPasswordLink from './pages/auth_pages/ResetPasswordLink';
import Profile from './pages/auth_pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />


          {/* AUTH PAGES */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confirm/:tokenHash" element={<ConfirmSignup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpwdlink" element={<ResetPasswordLink />} />
          <Route path="/resetpwd/:tokenHash" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          
       
          


          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
