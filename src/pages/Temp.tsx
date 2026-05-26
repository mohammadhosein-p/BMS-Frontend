// import CustomToast from "@/components/Custom/CustomToast";
// import { loginService } from "@/services/authService"; 
// import useAuthStore from "@/store/useAuthStore"; 
// import { translateNumber } from "@/utils/translateNumber";
// import { useState } from "react";

// export default function Temp() {
//     const { user, setAuth } = useAuthStore();
    
//     const [usernameInput, setUsernameInput] = useState<string>(""); 
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [count, setCounter] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(false);

//     const showToast = () => {
//         CustomToast("This is a toast");
//     };

//     const increaseCounter = () => {
//         setCounter((prev) => prev + 1);
//     };

//     const login = () => {
//         if (!email || !password) {
//             CustomToast("Please fill in all fields", "error");
//             return;
//         }

//         setLoading(true);
//         loginService({ email, username: usernameInput, password })
//             .then((data) => {
//                 setAuth(data); 
//                 CustomToast("Login successful", "success");
//             })
//             .catch((error) => {
//                 console.error(error);
//                 CustomToast("Login failed", "error");
//             })
//             .finally(() => setLoading(false));
//     };

//     return (
//         <div className="w-full h-screen font-3xl flex flex-col place-self-center justify-center gap-4">
//             <div className="flex gap-2 rounded-md place-self-center">
//                 <button
//                     className="bg-red-600 text-white rounded-md p-2 cursor-pointer"
//                     onClick={showToast}
//                 >
//                     toast
//                 </button>
//                 <button
//                     className="cursor-pointer bg-accent rounded-md p-2"
//                     onClick={login}
//                     disabled={loading} 
//                 >
//                     {loading ? <p>Logging in...</p> : <p>Login</p>}
//                 </button>
//             </div>

//             <div className="bg-neutral-400 w-fit p-4 rounded-md flex flex-col place-self-center gap-4">
//                 <input
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     className="border-1 border-neutral-800 p-1 rounded"
//                 />
//                 <input
//                     value={usernameInput}
//                     onChange={(e) => setUsernameInput(e.target.value)}
//                     placeholder="Username (Optional)"
//                     className="border-1 border-neutral-800 p-1 rounded"
//                 />
//                 <input
//                     type="password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     className="border-1 border-neutral-800 p-1 rounded"
//                 />
//             </div>

//             <p className="text-5xl text-center">This is a temp page</p>

//             <div className="flex flex-col place-items-center gap-2">
//                 <button
//                     className="bg-red-600 text-white rounded-md p-4 cursor-pointer"
//                     onClick={increaseCounter}
//                 >
//                     Increase count
//                 </button>
//                 <div className="text-red-600 flex vazir">
//                     Count: {translateNumber(count)}
//                 </div>
//             </div>

//             {user && (
//                 <div className="text-center text-green-600">
//                     Logged in as: <strong>{user.username || user.first_name}</strong>
//                 </div>
//             )}
//         </div>
//     );
// }