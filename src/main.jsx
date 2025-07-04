// import React from "react";
// import ReactDOM from "react-dom/client";
// // import App from "./App.jsx";
// import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
// // import Experience from "./components/Experience";
// import App from "./App.jsx";
// import Home from "./components/Home";
// import About from "./components/About";
// import DesktopNavigation from "./components/navigation/DesktopNavigation.jsx";
// import MobileNavigation from "./components/navigation/MobileNavigation.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 		<BrowserRouter>
// 			<DesktopNavigation />
// 			<MobileNavigation />
// 			<App />
// 			<Routes>
// 				<Route index element={<Home />} />
// 				<Route path="/about" element={<About />} />
// 			</Routes>
// 		</BrowserRouter>
// 	</React.StrictMode>,
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { NavigationProvider } from './contexts/NavigationContext';
import App from './App';
import DesktopNavigation from './components/navigation/DesktopNavigation';
import MobileNavigation from './components/navigation/MobileNavigation';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Project from './pages/Project';
import Contact from './pages/Contact';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
	  <NavigationProvider>
      <DesktopNavigation />
      <MobileNavigation />
      <App />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
	  </NavigationProvider>
    </BrowserRouter>
  </React.StrictMode>
);