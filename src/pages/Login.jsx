import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      console.log(res)
      navigate("/dashboard");
    }).catch(() => alert("Invalid credentials"));

    
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#ECE9E9] space-y-4 ">
        <div className="font-bold text-2xl mb-5">Login</div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Email*</span>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-2 rounded-xl w-full"
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Password*</span>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-2 rounded-xl w-full"
            />
          </div>
        </div>
        <div>
          Don't have an account ? <a href="/signup">sign-up</a>
        </div>
        <div className="w-[400px]">
          <button onClick={handleLogin} className="bg-[#A30A00] p-2 rounded-xl w-full text-white font-semibold">
            Login
          </button>
        </div>
      </div>
    </>
  );
};
