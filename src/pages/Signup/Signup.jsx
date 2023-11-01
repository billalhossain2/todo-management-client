import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../provider/AuthProvider";
import Error from "../../components/Error";
import Success from "../../components/Success";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, registerWithEmailAndPwd, updateUser } = useContext(authContext);
  const [file, setFile] = useState("");
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = reader.readAsDataURL(file);
    reader.onload = (ev) => {
      setFile(ev.target.result);
    };
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const photo = file;
    //validate empty fields
    if (!name || !email || !password || !file) {
      return toast.error("All fields are mandatory!", { autoClose: 1000 });
    }

    //validate password
    if (!/[a-z]/.test(password)) {
      return setError(
        "Your password should contain at least one lower case letter"
      );
    } else if (!/[A-Z]/.test(password)) {
      return setError(
        "Your password should contain at least one upper case letter"
      );
    } else if (!/[0-9]/.test(password)) {
      return setError(
        "Your password should contain at least one numeric digit"
      );
    } else if (!/[@#*$]/.test(password)) {
      return setError(
        "Your password should contain at least one special character (@ # * $)"
      );
    } else if (password.length < 6) {
      return setError("Your password should be at least 6 character longer");
    }

    registerWithEmailAndPwd(email, password)
      .then((userCredential) => {
        //Update user profile info
        updateUser({ displayName: name, photoURL: file })
          .then(() => {
            setSuccess("Registration successful!");
            toast.success("Registration success!", { autoClose: 1000 });
            console.log(user)
          })
          .catch(error => {
            setError(error.message)
            toast.error(error.message, { autoClose: 1000 });
          });
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message, { autoClose: 1000 });
      });
  };
  return (
    <section className="overflow-hidden bg-white h-screen text-center p-5 max-w-[500px] mx-auto drop-shadow-lg rounded-3xl flex flex-col justify-around items-center relative">
      {/* <!-- back button  --> */}
      <div className="absolute lg:top-10 top-5 lg:left-7 md:left-7 left-3">
        <a href="../index.html">
          <i className="fa-solid fa-chevron-left text-3xl text-[#9500FF] font-bold cursor-pointer"></i>
        </a>
      </div>
      {/* <!-- triangle  --> */}
      <div className="absolute border-l-[50px] border-r-[50px] border-solid lg:border-t-[80px] md:border-t-[80px] border-t-[40px] border-l-transparent border-r-transparent border-t-[#9500ff] top-0 lg:right-10 md:right-10 right-0"></div>
      <div>
        <h1 className="lg:text-4xl md:text-4xl text-2xl font-semibold mb-3">
          Sign Up
        </h1>
        <p className="lg:mb-0 mb-2">
          Welcome to our todo list app! The sign-up page is your gateway to
          organized productivity. Create an account, unlock a world of task
          management, and seize control of your daily to-dos effortlessly. Join
          now and start achieving your goals with ease!
        </p>
      </div>
      <form className="w-full space-y-5" action="#">
        <div>
          <input
            required
            ref={nameRef}
            type="text"
            name="name"
            placeholder="User name"
            className="input input-bordered rounded-full w-full"
          />
        </div>
        <div className="flex">
          <input
            required
            onChange={fileChangeHandler}
            type="file"
            name="file"
            className="input input-bordered rounded-full w-full"
          />
        </div>

        <div>
          <input
            required
            type="email"
            ref={emailRef}
            name="email"
            placeholder="E-mail"
            className="input input-bordered rounded-full w-full"
          />
        </div>
        <div>
          <input
            required
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="input input-bordered rounded-full w-full"
          />
        </div>
        <button
          onClick={handleSignup}
          className="bg-[#9500FF] text-white hover:bg-[#621599] lg:px-20 lg:py-3 px-10 py-2 rounded-full font-medium"
        >
          Sign Up
        </button>
        {error && <Error title={error}></Error>}
        {success && <Success title={success}></Success>}
      </form>
      <p>
        Alreay have an account?{" "}
        <Link className="font-bold text-[#621599] hover:underline" to="/">
          Login
        </Link>
      </p>
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default Signup;
