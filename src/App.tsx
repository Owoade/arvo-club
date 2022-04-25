import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/Login';
import SignUp from './pages/Sign-up';
import Dashboard from './pages/dashboard';
import ClubDetails from './pages/dashboard/ClubDetails';
import Notifications from "./pages/dashboard/Notifications";
import Notification from "./pages/dashboard/Notification";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from "react";
import Invite from './pages/dashboard/Invite';
function App() {
  const [signedIn, setSignedIn] = useState(false);
  const auth=getAuth()
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      user ? setSignedIn(true) : setSignedIn(false)
    })
    return () => subscribe();
  }, [])
  if(signedIn){
     return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/club-details/:id" element={<ClubDetails />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/notification/:id" element={<Notification />} />
          <Route path="/dashboard/invite/:id" element={<Invite />} />
        </Routes>
     </BrowserRouter>
    </div>
  );
  }else{
    return (
      <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
     </BrowserRouter>
     </div>
     )
     
  }
 
}

export default App;
