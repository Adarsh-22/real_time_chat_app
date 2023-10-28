import { useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [pic, setPic] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	let navigate = useNavigate();

	const picHandler = (pic) => {
		setLoading(true);
		if (pic === undefined) {
			toast({
				title: "Please select an image.",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}
		if (pic.type === "image/jpeg" || pic.type === "image/png") {
			const data = new FormData();
			data.append("file", pic);
			data.append("upload_preset", "real_time_chat");
			data.append("cloud_name", "adarsh002");
			fetch(`https://api.cloudinary.com/v1_1/adarsh002/image/upload`, {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		} else {
			toast({
				title: "Image format must be jpej or png",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
	};

	const signupHandler = async () => {
		setLoading(true);
		if (!name || !email || !password || !confirmPassword) {
			toast({
				title: "Please fill all the fields",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			toast({
				title: "Passwords do not match",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const { data } = await axios.post("/api/user", { name, email, password, pic }, config);

			if (data) {
				toast({
					title: "User Registration Successful",
					status: "success",
					duration: 5000,
					isClosable: true,
					position: "bottom",
				});
				localStorage.setItem("userInfo", JSON.stringify(data));
				navigate("/chats");
				setLoading(false);
			}
		} catch (error) {
			toast({
				title: "Error Occured",
				description: error.toString(),
				status: "error",
				duration: 8000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
		}
	};
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
			<FormControl id="profile">
				<FormLabel>Profile</FormLabel>
				<InputGroup>
					<Input type="file" p={1.5} accept="image/*" onChange={(e) => picHandler(e.target.files[0])} />
				</InputGroup>
			</FormControl>

			<Button colorScheme="blue" width="100%" mt={15} onClick={signupHandler} isLoading={loading}>
				Signup
			</Button>
		</VStack>
	);
};

export default Signup;
