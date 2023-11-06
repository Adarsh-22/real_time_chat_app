import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import {
	Button,
	IconButton,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton icon={<ViewIcon />} d={{ base: "flex" }} onClick={onOpen} />
			)}

			<Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={30} fontFamily="Work sans" display="flex" justifyContent="center">
						{user.name.toUpperCase()}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display="flex" flexDirection="column" alignItems="center">
						<Image boxSize="150px" src={user.pic} alt={user.name} objectFit="fill" />
						<Text fontSize="2xl">Email : {user.email}</Text>
					</ModalBody>
					{/* <ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter> */}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default ProfileModal;
