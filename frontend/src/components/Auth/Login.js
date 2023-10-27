import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginClickHandler = () => {};

	return (
		<VStack spacing="5px">
			<FormControl id="email" isRequired>
				<FormLabel>Email</FormLabel>
				<Input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
			</FormControl>
			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? "text" : "password"}
						placeholder="Enter your password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button height="1.5rem" size="sm" onClick={() => setShow(!show)}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button colorScheme="blue" width="100%" mt={15} onClick={loginClickHandler}>
				Login
			</Button>
			<Button
				variant="solid"
				colorScheme="red"
				width="100%"
				mt={15}
				onClick={() => {
					setEmail("guest@example.com");
					setPassword("1223456");
				}}>
				Get Guest User Credentials
			</Button>
		</VStack>
	);
};

export default Login;
