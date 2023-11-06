import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import axios from "axios";
import ChatPage from "./pages/ChatPage";

function App() {
	// axios.defaults.baseURL = process.env.API_URL ? process.env.API_URL : "http://127.0.0.1:5000";

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/chats" element={<ChatPage />} />
			</Routes>
		</div>
	);
}

export default App;
