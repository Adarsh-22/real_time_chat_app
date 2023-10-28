import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

const Homepage = () => {
	return (
		<Container maxW="xl" centerContent>
			<Box
				d="flex"
				justifyContent="center"
				p={3}
				bg="white"
				width="100%"
				m="40px 0 15px 0"
				borderRadius="lg"
				borderWidth="1px">
				<Text textAlign="center" fontFamily="Work sans" fontSize="3xl" fontWeight="bold">
					Chat Sphere
				</Text>
			</Box>
			<Box borderRadius="lg" borderWidth="1px" bg="white" width="100%" p={4}>
				<Tabs variant="soft-rounded">
					<TabList>
						<Tab width="50%">Login</Tab>
						<Tab width="50%">Signup</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default Homepage;
