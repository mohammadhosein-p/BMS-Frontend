import useUserStore from "@/store/userStore/userStore";

export default function Login() {
	const { username, setUsername } = useUserStore();
	const updateUsername = () => {
		setUsername("Ali");
	};
	return (
		<div>
			<p>usename:{username}</p>
			<button onClick={updateUsername} className="bg-red-600">change username</button>
		</div>
	);
}
