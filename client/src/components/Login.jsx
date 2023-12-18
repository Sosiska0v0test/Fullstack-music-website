import React, { useEffect } from "react";
import { LoginBg } from "../assets/video/index";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              window.localStorage.setItem("auth", "true");
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true")
      navigate("/", { replace: true });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      <div className="md:w-2/5 bg-black flex flex-col items-center justify-center text-center p-4">
        <p className="text-2xl text-primary font-bold mb-4">
          Увійдіть за допомогою Google, щоб почати слухати та завантажувати музику 🎶
        </p>
        <div
          onClick={ loginWithGoogle }
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-black cursor-pointer hover:bg-pink-800 hover:shadow-md hover:text-primary duration-300 ease-in-out transition-all"
        >
          <FcGoogle className="text-xl" />
          <p className="text-lg font-semibold">Sign in with Google</p>
        </div>
      </div>

      <div className="md:w-3/5">
        <video
          src={ LoginBg }
          type="video/mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
      </div>
    </div>
  );
};

export default Login;