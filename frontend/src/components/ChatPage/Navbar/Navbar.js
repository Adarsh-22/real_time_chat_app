import {
	Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Input,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
	useToast,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { BellIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import { useRef, useState } from "react";
import { GlobalState } from "../../../Context/GlobalContext";
import ProfileModal from "../ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../../UserAvatar/UserListItem";

const Navbar = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState();
	const [loading, setLoading] = useState(false);
	const [loadingChat, SetLoadingChat] = useState(false);

	const { user, setSelectedChat, chats, setChats } = GlobalState();
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("userInfo");
		navigate("/");
	};

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const toast = useToast();

	const handleSearch = async () => {
		if (!search) {
			toast({
				title: "Please enter something in the search",
				status: "warning",
				duration: 3000,
				isClosable: true,
				position: "top-left",
			});
			return;
		}

		try {
			setLoading(true);
			const { data } = await axios.get(`/api/user?search=${search}`);

			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast({
				title: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-left",
			});
		}
	};

	const accessChat = async (userId) => {
		try {
			SetLoadingChat(true);

			const { data } = await axios.post("/api/chat", { userId });

			setSelectedChat(data);
			if (!chats.find((row) => row._id === data._id)) setChats([data, ...chats]);
			SetLoadingChat(false);

			onClose();
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
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			p="5px 10px 5px 10px"
			bg="whiteAlpha.800">
			<Tooltip label="Search Users to chat with" hasArrow placement="bottom-end">
				<Button variant="ghost" ref={btnRef} onClick={onOpen}>
					<SearchIcon />{" "}
					<Text d={{ base: "none", md: "flex" }} p={4}>
						Search User
					</Text>
				</Button>
			</Tooltip>

			<Text fontFamily="Work sans" fontSize="2xl" fontWeight="600">
				Chat Sphere
			</Text>
			<div>
				<Menu>
					<MenuButton p={1}>
						<BellIcon fontSize="2xl" />
					</MenuButton>
				</Menu>
				<Menu>
					<MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
						<Avatar size="sm" cursor="pointer" name={user.name || ""} src={user.pic} />
					</MenuButton>

					<MenuList>
						<ProfileModal user={user}>
							<MenuItem>My profile</MenuItem>
						</ProfileModal>
						<MenuDivider />
						<MenuItem onClick={logout}>Logout</MenuItem>
					</MenuList>
				</Menu>
			</div>

			<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent overflowY="scroll">
					<DrawerCloseButton />
					<DrawerHeader>Search Users</DrawerHeader>

					<DrawerBody>
						<Box display="flex" pb={2}>
							<Input
								type="text"
								value={search}
								placeholder="Search by name or email"
								mr={2}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button variant="ghost" onClick={handleSearch}>
								Go
							</Button>
						</Box>

						{loading ? (
							<ChatLoading />
						) : searchResult?.length > 0 ? (
							<Box>
								{searchResult.map((row) => {
									return (
										<UserListItem
											key={row._id}
											user={row}
											handleFunction={() => accessChat(row._id)}
										/>
									);
								})}
							</Box>
						) : (
							searchResult && <Text>User Not found</Text>
						)}
						{loadingChat && <Spinner ml="auto" display="flex" />}
					</DrawerBody>

					<DrawerFooter>Chat Sphere</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Box>
	);
};

export default Navbar;
