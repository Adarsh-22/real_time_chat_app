import { Box } from "@chakra-ui/react";
import { GlobalState } from "../../../Context/GlobalContext";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	const { selectedChat } = GlobalState();

	return (
		<Box
			display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
			alignItems="center"
			flexDirection="column"
			p={3}
			bg="white"
			w={{ base: "100%", md: "68%" }}
			borderRadius="md"
			borderWidth="1px">
			<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</Box>
	);
};

export default ChatBox;
