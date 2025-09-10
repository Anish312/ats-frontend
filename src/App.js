import React from "react";
import ProfileScorePage from "./screens/profileScorePage/ProfileScorePage";
import UploadResume from "./screens/uploadResume/UploadResume";
import ShowResult from "./screens/showResult/ShowResult";
import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom";
import Home from "./screens/home/Home";

import Header from "./components/resumeCheckerInfo/header/Header";
import Footer from "./components/footer/Footer";
import Test from "./screens/Test";
import axios from "axios";

function App() {

  return (
     <div className="app">
      <Header/>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
            <Home />
        } />
        <Route path="/result" element={
          
            <ShowResult />
          
        } />
              <Route path="/test" element={
          
            <Test />
          
        } />
        
      </Routes>
    </Router>
    <Footer/>
  </div>
  );
}

export default App;
