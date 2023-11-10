import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction }) => {
	return (
		<Button
			px={2}
			size="sm"
			borderRadius="md"
			mb={2}
			m={1}
			variant="solid"
			colorScheme="purple"
			fontSize={12}
			cursor="pointer"
			onClick={handleFunction}>
			{user.name}
			<CloseIcon pl={2} boxSize={4} />
		</Button>
	);
};

export default UserBadgeItem;
