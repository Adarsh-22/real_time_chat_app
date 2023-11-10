import { useDisclosure } from "@chakra-ui/hooks";
import {
	Box,
	Button,
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

const CreateGroupChatModal = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState("");

	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const { user, chats, setChats } = GlobalState();
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
	const handleGroupUserAdd = (userToAdd) => {
		if (selectedUsers.includes(userToAdd)) {
			toast({
				title: "User Already Added",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
			return;
		}
		setSelectedUsers([...selectedUsers, userToAdd]);
	};
	const handleUserRemove = (user) => {
		setSelectedUsers(selectedUsers.filter((row) => row._id !== user._id));
	};
	const handleSubmit = async () => {
		if (groupChatName === "" || selectedUsers.length < 2) {
			console.log(selectedUsers.map((row) => row._id));
			toast({
				title: "Fill fill All The Details",
				description: "Add Chat name or you must select two users",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
			return;
		}

		try {
			const { data } = await axios.post("/api/chat/group", {
				name: groupChatName,
				users: JSON.stringify(selectedUsers.map((row) => row._id)),
			});
			setChats([data, ...chats]);
			onClose();
			setSelectedUsers([]);
			setGroupChatName("");
			setSearchResults([]);
			setSearch("");
			toast({
				title: "New Groupchat Created",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
		} catch (error) {
			toast({
				title: "Group Chat Failed",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
		}
	};

	return (
		<div>
			<span onClick={onOpen}>{children}</span>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="30px" fontFamily="Work Sans" display="flex" justifyContent="center">
						Create Group Chat
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display="flex" flexDirection="column" alignItems="center">
						<FormControl>
							<Input
								placeholder="Chat Name"
								value={groupChatName}
								mb={3}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<Input
								placeholder="Add Users"
								mb={1}
								value={search}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>
						{/* selected Users */}
						<Box display="flex" width="100%" flexWrap="wrap" mb={2}>
							{selectedUsers.map((row) => {
								return (
									<UserBadgeItem
										key={row._id}
										user={row}
										handleFunction={() => handleUserRemove(row)}
									/>
								);
							})}
						</Box>

						{/* Search from users */}
						{loading ? (
							<Spinner />
						) : (
							searchResults.slice(0, 4).map((row) => {
								return (
									<UserListItem
										key={row._id}
										user={row}
										handleFunction={() => handleGroupUserAdd(row)}
									/>
								);
							})
						)}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleSubmit}>
							Create Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default CreateGroupChatModal;
