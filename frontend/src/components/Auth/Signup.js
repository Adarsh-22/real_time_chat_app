import { Button, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";

const Signup = () => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const picHandler = (pic) => {};

	const signupHandler = () => {};
	return (
		<VStack spacing="5px">
			<FormControl id="name" isRequired>
				<FormLabel>Name</FormLabel>
				<Input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
			</FormControl>
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
			<FormControl id="confirmPassword" isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? "text" : "password"}
						placeholder="Confirm password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button height="1.5rem" size="sm" onClick={() => setShow(!show)}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl id="profile" isRequired>
				<FormLabel>Profile</FormLabel>
				<InputGroup>
					<Input type="file" p={1.5} accept="image/*" onChange={(e) => picHandler(e.target.files[0])} />
				</InputGroup>
			</FormControl>

			<Button colorScheme="blue" width="100%" mt={15} onClick={signupHandler}>
				Signup
			</Button>
		</VStack>
	);
};

export default Signup;
