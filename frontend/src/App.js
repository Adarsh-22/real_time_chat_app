import "./App.css";
import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
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
