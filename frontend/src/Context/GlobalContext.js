import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState();
	const [selectedChat, setSelectedChat] = useState();
	const [chats, setChats] = useState([]);

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));

		setUser(userInfo);
		if (!userInfo) navigate("/");
		else axios.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;

		console.log("Load User Ran");
	}, [navigate]);
	return (
		<GlobalContext.Provider value={{ user, setUser, setSelectedChat, selectedChat, chats, setChats }}>
			{children}
		</GlobalContext.Provider>
	);
};
export const GlobalState = () => {
	return useContext(GlobalContext);
};
export default GlobalProvider;
