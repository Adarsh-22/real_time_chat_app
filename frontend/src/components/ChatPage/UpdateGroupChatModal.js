import { useDisclosure } from "@chakra-ui/hooks";
import {
	Box,
	Button,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	useToast,
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import { useState } from "react";
import { GlobalState } from "../../Context/GlobalContext";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import { EditIcon } from "@chakra-ui/icons";
import ChatLoading from "./Navbar/ChatLoading";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
	const { selectedChat, setSelectedChat, user } = GlobalState();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
	const [search, setSearch] = useState("");

	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [renameLoading, setRenameLoading] = useState(false);

	const toast = useToast();

	const handleSearch = async (query) => {
		console.log(query);
		setSearch(query);
		if (!query) return;
		try {
			setLoading(true);
			const { data } = await axios.get(`/api/user?search=${query}`);
			setSearchResults(data);
			console.log(data);
			setLoading(false);
		} catch (error) {
			toast({
				title: "Error occcured",
				description: "Failed to load results",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom-left",
			});
		}
	};
	const handleGroupUserAdd = async (userToAdd) => {
		if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
			toast({
				title: "User Already in Group",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
			return;
		}
		if (selectedChat.groupAdmin._id !== user._id) {
			toast({
				title: "Only Admin Can Add Users",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
			return;
		}
		{
			try {
				const { data } = await axios.put("/api/chat/add_to_group", {
					chatId: selectedChat._id,
					userId: userToAdd,
				});
				setSelectedChat(data);
				setFetchAgain(!fetchAgain);
				setLoading(false);
			} catch (error) {
				toast({
					title: "Error",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "bottom",
				});
			}
		}
	};
	const handleUserRemove = async (userToDel) => {
		if (selectedChat.groupAdmin._id !== user._id && user._id !== userToDel._id) {
			toast({
				title: "Only admins can remove someone!",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}

		try {
			if (userToDel._id !== user._id) {
				setLoading(true);
				const { data } = await axios.put(`api/chat/remove_from_group`, {
					chatId: selectedChat._id,
					userId: userToDel._id,
				});
				setSelectedChat(data);
				setFetchAgain(!fetchAgain);
				fetchMessages();

				setLoading(false);
			} else {
				toast({
					title: "Admins cannot leave the group!",
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "bottom",
				});
			}
		} catch (error) {}
	};
	// const handleSubmit = async () => {
	// 	if (groupChatName === "" || selectedUsers.length < 2) {
	// 		console.log(selectedUsers.map((row) => row._id));
	// 		toast({
	// 			title: "Fill fill All The Details",
	// 			description: "Add Chat name or you must select two users",
	// 			status: "warning",
	// 			duration: 5000,
	// 			isClosable: true,
	// 			position: "top",
	// 		});
	// 		return;
	// 	}

	// 	try {
	// 		const { data } = await axios.post("/api/chat/group", {
	// 			name: groupChatName,
	// 			users: JSON.stringify(selectedUsers.map((row) => row._id)),
	// 		});
	// 		setChats([data, ...chats]);
	// 		onClose();
	// 		toast({
	// 			title: "New Groupchat Created",
	// 			status: "success",
	// 			duration: 5000,
	// 			isClosable: true,
	// 			position: "top",
	// 		});
	// 	} catch (error) {
	// 		toast({
	// 			title: "Group Chat Failed",
	// 			description: error.message,
	// 			status: "error",
	// 			duration: 5000,
	// 			isClosable: true,
	// 			position: "top",
	// 		});
	// 	}
	// };
	const handleGroupChatRename = async () => {
		if (!groupChatName && groupChatName === selectedChat.chatName) return;

		try {
			setRenameLoading(true);
			const { data } = await axios.put("/api/chat/renameGroup", {
				chatId: selectedChat._id,
				chatName: groupChatName,
			});
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);
		} catch (error) {
			toast({
				title: "Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setRenameLoading(false);
		}
	};

	return (
		<div>
			<IconButton onClick={onOpen} icon={<EditIcon />} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="30px" fontFamily="Work Sans" display="flex" justifyContent="center">
						{selectedChat.chatName}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display="flex" flexDirection="column" alignItems="center">
						<Box display="flex" width="100%" flexWrap="wrap" mb={2}>
							{selectedChat.users.map((row) => {
								return (
									<UserBadgeItem
										key={row._id}
										user={row}
										handleFunction={() => handleUserRemove(row)}
									/>
								);
							})}
						</Box>

						<FormControl display="flex">
							<Input
								placeholder="Chat Name"
								value={groupChatName}
								mb={3}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
							<Button
								colorScheme="blue"
								mr={3}
								onClick={handleGroupChatRename}
								ml={2}
								isLoading={renameLoading}>
								Update
							</Button>
						</FormControl>
						<FormControl>
							<Input
								placeholder="Add Users"
								mb={1}
								value={search}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>
						{loading ? (
							<Spinner size="lg" />
						) : (
							searchResults?.map((row) => (
								<UserListItem key={user.id} user={row} handleFunction={() => handleGroupUserAdd(row)} />
							))
						)}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={() => handleUserRemove(user)}>
							Leave Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default UpdateGroupChatModal;
