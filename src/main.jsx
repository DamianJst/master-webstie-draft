import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
// import Experience from "./components/Experience";
import App from "./App.jsx";
import Home from "./components/Home";
import About from "./components/About";
import DesktopNavigation from "./components/navigation/DesktopNavigation.jsx";
import MobileNavigation from "./components/navigation/MobileNavigation.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<DesktopNavigation />
			{/* <MobileNavigation /> */}
			<App />
			<Routes>
				<Route index element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
