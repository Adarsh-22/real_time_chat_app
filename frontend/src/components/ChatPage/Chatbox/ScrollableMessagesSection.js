import ScrollableFeed from "react-scrollable-feed";
import { GlobalState } from "../../../Context/GlobalContext";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../../config/chatLogic";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableMessagesSection = ({ messages }) => {
	const { user } = GlobalState();
	return (
		<ScrollableFeed>
			{messages &&
				messages.map((row, i) => (
					<div style={{ display: "flex" }} key={row._id}>
						{(isSameSender(messages, row, i, user._id) || isLastMessage(messages, i, user._id)) && (
							<Tooltip label={row.sender.name} placement="bottom-start" hasArrow>
								<Avatar
									mt="7px "
									mr={1}
									size="sm"
									cursor="pointer"
									name={row.sender.name}
									src={row.sender.pic}
								/>
							</Tooltip>
						)}
						<span
							style={{
								backgroundColor: `${row.sender._id === user._id ? "#BEE3f8" : "#B9F5D0"}`,
								borderRadius: "15px",
								padding: "5px 15px",
								maxWidth: "73%",
								marginLeft: isSameSenderMargin(messages, row, i, user._id),
								marginTop: isSameUser(messages, row, i, user._id) ? 3 : 10,
							}}>
							{row.content}
						</span>
					</div>
				))}
		</ScrollableFeed>
	);
};

export default ScrollableMessagesSection;
