import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<h1>Hello</h1>
			<Routes>
				<Route path="/" element={<></>} />
			</Routes>
		</div>
	);
}

export default App;
