
import './App.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import SI from './components/SI';
import LoginFormU from './components/LoginFormU';
import NavbarA from './AdminComponent/NavbarA';
import NavbarU from './UserComponent/NavbarU';
import Venue from './AdminComponent/Venue';
import Equipment from './AdminComponent/Equipment';
import Schedule from './AdminComponent/Schedule';
import VB from './UserComponent/VB';
import EI from './UserComponent/EI';
import SC from './UserComponent/SC';


function App() {
  const [showNavbarA, setShowNavbarA] = useState(false);
  
   const handleLogin = () => {
    setShowNavbarA(true);
  }
  const handleLogout = () =>{
    setShowNavbarA(false);
  }
  const [showNavbarU, setShowNavbarU] = useState(false);
  const handleLoginU = () => {
    setShowNavbarU(true);
  }
  const handleLogoutU = () => {
    setShowNavbarU(false);
  }
  return (
<>
    <BrowserRouter>
    {showNavbarA ? (
    <NavbarA onLogout={handleLogout} />
  ) : showNavbarU ? (
    <NavbarU onLogout={handleLogoutU} />
  ) : (
    <Navbar title="Sportz Interactive" />
  )}
        <Routes>
          <Route exact path="/"element={<SI />}/>
        {/* <Route exact path="/NavbarA" element={<NavbarA />} */}  
            
            onEnter={() => setShowNavbarA(true)}
            onLeave={() => setShowNavbarA(false)}
          <Route exact path="/LoginForm" element={<LoginForm onLogin={handleLogin}/>}/>
          onEnter={() => setShowNavbarU(true)}
           onLeave={() => setShowNavbarU(false)}
          

           <Route exact path="/LoginFormU" element={<LoginFormU onLogin={handleLoginU}/>}/>
        </Routes>
        <div className="container my-2">
        <Routes>
        <Route exact path="/Venue" element={<Venue/>}/>
        </Routes>
        <Routes>
         <Route exact path="/Equipment" element={<Equipment/>}/> 
        </Routes>
        <Routes>
         <Route exact path="/Schedule" element={<Schedule/>}/> 
        </Routes>
        <Routes>
        <Route exact path="/VB" element={<VB/>}/>
        </Routes>
        <Routes>
         <Route exact path="/EI" element={<EI/>}/> 
        </Routes>
        <Routes>
         <Route exact path="/SC" element={<SC/>}/> 
        </Routes>
        </div>
    </BrowserRouter>
</>
  );
}
export default App;
