import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from "../../provider/AuthProvider";
import Error from "../../components/Error";
import Success from "../../components/Success";
const Login = () => {
  const {user, loginWithEmailAndPwd} = useContext(authContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()
  const emailRef = useRef();
  const passwordRef = useRef()
  const handleLogin = e=>{
    e.preventDefault();
    setError('');
    setSuccess('');
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
     //validate empty fields
     if(!email || !password){
      return toast.error('All fields are mandatory!', {autoClose:1000})
    }
     // password: billalHossain7*
    loginWithEmailAndPwd(email, password)
    .then(userCredential => {
      setSuccess('Login success')
      toast.success("Login success", {autoClose:1000})
      navigate("/todo")
    })
    .catch(error=>{
      setError(error.message)
      toast.error(error.message, {autoClose:1000})
    })
  }
  return (
    <section className="bg-white overflow-hidden h-screen text-center p-5 max-w-[500px] mx-auto drop-shadow-lg rounded-3xl flex flex-col justify-around items-center relative">
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
          Welcome
        </h1>
        <p className="lg:mb-0 mb-2">
          Welcome to our sleek and intuitive todo list app! Streamline your
          productivity with our secure login page, ensuring your tasks and
          personal information stay protected. Join our community and embark on
          a journey of organized efficiency today.
        </p>
      </div>
      <form className="w-full space-y-5" action="#" onSubmit={handleLogin}>
        <div>
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="E-mail"
            className="input input-bordered rounded-full w-full"
          />
        </div>
        <div>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered rounded-full w-full"
          />
        </div>
        <div>
          <button className="bg-[#9500FF] mb-3 text-white hover:bg-[#621599] lg:px-20 lg:py-3 px-10 py-2 rounded-full font-medium">
            Log in
          </button>
          {
            error && <Error title={error}></Error>
          }
          {
            success && <Success title={success}></Success>
          }
      </div>
      </form>
      <p>Don't have an account? <Link className="font-bold text-[#621599] hover:underline" to="/signup">Signup</Link></p>
    <ToastContainer></ToastContainer>
    </section>
  );
};

export default Login;
