import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { doc, getDoc } from "firebase/firestore";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { updateUser, user } = useUserStore();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        console.log(res.user.uid);
        const userDataDoc = await getDoc(doc(db, "user_data", res.user.uid));
        if (userDataDoc.exists()) {
          updateUser(userDataDoc.data());
          if (userDataDoc.data().role == 0) {
            navigate("/dashboard");
          } else if (userDataDoc.data().role == 1) {
            navigate("/trainerdashboard");
          } else {
            navigate("/competition");
          }
        }
      })
      .catch((e) => alert(e));
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#ECE9E9] space-y-4 ">
        <div className="font-bold text-2xl mb-5">Login</div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Email*</span>
            <input
              type="email"
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
              type="password"
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
          <button
            onClick={handleLogin}
            className="bg-[#A30A00] p-2 rounded-xl w-full text-white font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
