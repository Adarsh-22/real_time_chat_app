import "./App.css";
import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import axios from "axios";

function App() {
	// axios.defaults.baseURL = process.env.API_URL ? process.env.API_URL : "http://127.0.0.1:5000";

	return (
		<div className="App">
			<h1>Hello</h1>
			<Routes>
				<Route path="/" element={<Homepage />} />
			</Routes>
		</div>
	);
}

export default App;
