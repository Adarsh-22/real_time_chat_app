import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { GlobalState } from "../../../Context/GlobalContext";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFullDetails } from "../../../config/chatLogic";
import ProfileModal from "../ProfileModal";
import UpdateGroupChatModal from "../UpdateGroupChatModal";
import { useEffect, useState } from "react";
import ScrollableMessagesSection from "./ScrollableMessagesSection";
import axios from "axios";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = GlobalState();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState();

	const toast = useToast();

	const fetchMessages = async () => {
		if (!selectedChat) return;

		try {
			setLoading(true);
			const { data } = await axios.get(`/api/message/${selectedChat._id}`);
			setMessages(data);
			setLoading(false);
		} catch (error) {}
	};
	useEffect(() => {
		fetchMessages();
	}, [selectedChat]);

	const sendNewmessage = async (e) => {
		if (e.key === "Enter" && newMessage) {
			try {
				const { data } = await axios.post("/api/message", { content: newMessage, chatId: selectedChat._id });

				setNewMessage("");
				setMessages([...messages, data]);
				console.log(messages);
			} catch (error) {
				toast({
					title: "Error Occured",
					description: "failed to send message",
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "bottom",
				});
			}
		}
	};
	const typingHandler = (e) => {
		setNewMessage(e.target.value);
	};

	return (
		<>
			{selectedChat ? (
				<>
					<Box
						fontSize={{ base: "28px", md: "30px" }}
						pb={3}
						w="100%"
						fontFamily="Work Sans"
						display="flex"
						justifyContent={{ base: "space-between" }}
						alignItems="center"
						px={2}>
						<IconButton
							display={{ base: "flex", md: "none" }}
							icon={<ArrowBackIcon />}
							onClick={() => setSelectedChat("")}
						/>
						{!selectedChat.isGroupChat ? (
							<>
								{getSender(user, selectedChat.users)}
								<ProfileModal user={getSenderFullDetails(user, selectedChat.users)} />
							</>
						) : (
							<>
								{selectedChat.chatName.toUpperCase()}
								<UpdateGroupChatModal
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
									fetchMessages={fetchMessages}
								/>
							</>
						)}
					</Box>

					<Box
						display="flex"
						flexDirection="column"
						justifyContent="flex-end"
						p={3}
						bg="#E8E8E8"
						w="100%"
						h="100%"
						borderRadius="lg"
						overflow="hidden">
						{loading ? (
							<Spinner size="lg" w={20} h={20} alignSelf="center" margin="a " />
						) : (
							<div className="messages">
								<ScrollableMessagesSection messages={messages} />
							</div>
						)}

						<FormControl onKeyDown={sendNewmessage} isRequired mt={3}>
							<Input
								variant="filled"
								bg="#e0e0e0"
								placeholder="Enter a message"
								onChange={typingHandler}
								value={newMessage}
							/>
						</FormControl>
					</Box>
				</>
			) : (
				<Box display="flex" alignItems="center" justifyContent="center" height="100%">
					<Text fontSize="3xl" pb={3} fontFamily="Work sans">
						Select User to Chat With
					</Text>
				</Box>
			)}
		</>
	);
};

export default SingleChat;
