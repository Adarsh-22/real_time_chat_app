import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { GlobalState } from "../../Context/GlobalContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./Navbar/ChatLoading";
import { getSender } from "../../config/chatLogic";

const AllChats = () => {
	const [loggedUser, setLoggedUser] = useState();

	const { selectedChat, setSelectedChat, user, chats, setChats } = GlobalState();
	const toast = useToast();
	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
		fetchChats();
	}, []);

	const fetchChats = async () => {
		try {
			const { data } = await axios.get("/api/chat");
			setChats(data);
		} catch (error) {
			toast({
				title: "Error Fetching Chats",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-left",
			});
		}
	};

	return (
		<Box
			display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
			flexDirection="column"
			alignItems="center"
			p={3}
			bg="white"
			height="100%"
			w={{ base: "100%", md: "31%" }}
			borderRadius="lg"
			borderWidth="1px">
			<Box
				pb={3}
				px={3}
				fontSize={{ base: "28px", md: "30px" }}
				fontFamily="Lato"
				display="flex"
				width="100%"
				justifyContent="space-between"
				alignItems="center">
				<Text fontSize="2xl">MY Chats</Text>
				<Button display="flex" fontSize={{ base: "14px", md: "10px", lg: "17px" }} rightIcon={<AddIcon />}>
					Create Group Chat
				</Button>
			</Box>
			{chats.length > 0 ? (
				<Stack overflowY="scroll" width="100%">
					{chats.map((row) => {
						return (
							<Box
								onClick={() => setSelectedChat(row)}
								cursor="pointer"
								bg={selectedChat === row ? "#38B2AC" : "#E8E8E8"}
								color={selectedChat === row ? "white" : "black"}
								px={3}
								py={2}
								borderRadius="md"
								key={row._id}>
								<Text>{!row.isGroupChat ? getSender(loggedUser, row.users) : row.chatName}</Text>
							</Box>
						);
					})}
				</Stack>
			) : (
				<ChatLoading />
			)}
		</Box>
	);
};

export default AllChats;
