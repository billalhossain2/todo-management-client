import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="bg-white h-screen text-center p-5 max-w-[500px] mx-auto drop-shadow-lg rounded-3xl flex flex-col justify-around items-center relative">
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
            type="text"
            placeholder="User name"
            className="input input-bordered rounded-full w-full"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            className="input input-bordered rounded-full w-full"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered rounded-full w-full"
          />
        </div>
        <button className="bg-[#9500FF] text-white hover:bg-[#621599] lg:px-20 lg:py-3 px-10 py-2 rounded-full font-medium">
          Sign Up
        </button>
      </form>
      <p>Alreay have an account? <Link className="font-bold text-[#621599] hover:underline" to="/">Login</Link></p>
    </section>
  );
};

export default Signup;
