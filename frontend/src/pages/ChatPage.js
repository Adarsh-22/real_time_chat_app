import { GlobalState } from "../Context/GlobalContext";
import { Box } from "@chakra-ui/react";
import AllChats from "../components/ChatPage/AllChats";
import ChatBox from "../components/ChatPage/Chatbox/ChatBox";
import Navbar from "../components/ChatPage/Navbar/Navbar";
import { useState } from "react";

const ChatPage = () => {
	const { user } = GlobalState();
	const [fetchAgain, setFetchAgain] = useState(false);

	return (
		<div style={{ width: "100%" }}>
			{user && <Navbar />}

			<Box display="flex" justifyContent="space-between" width="100%" p="15px" h="90vh">
				{user && <AllChats fetchAgain={fetchAgain} />}
				{user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
			</Box>
		</div>
	);
};

export default ChatPage;
