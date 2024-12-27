import './scss/main.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import ConfirmEmail from "./pages/ConfirmEmail";
import ResetPwd from "./pages/ResetPwd";
import Navbar from "./components/nav/Navbar";
import Pizzas from "./pages/Pizzas";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import About from "./pages/About";
import RecaveryPwd from './pages/RecaveryPwd';


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
          <Route path="/recaverypassword" element={<RecaveryPwd />} />


          {/* HAVE TO AUTH PAGES */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confirm/:tokenHash" element={<ConfirmEmail />} />
          
          <Route path="/resetpwd/:tokenHash" element={<ResetPwd />} />


          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
