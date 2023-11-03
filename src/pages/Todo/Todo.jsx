import React, { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import TodoItem from "../../components/TodoItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getTodosApi from "../../api/getTodosApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../provider/AuthProvider";
import moment from "moment/moment";
import axios, { all } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Greeting from "../../components/Greeting";
// Night Mode Icons
import {BsSun, BsMoonStars} from "react-icons/bs"
import { themeContext } from "../../provider/ThemeProvider";

const Todo = () => {
  const { user, logOutUser } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const {isDarkMode, setIsDarkMode} = useContext(themeContext)

  const navigate = useNavigate();
  const handleModal = () => {
    setIsOpen(true);
  };

  const handleEditTodo = (editableTodo) => {
    setCurrent(editableTodo.priority.toUpperCase());
    setTaskTitle(editableTodo.title);
    setIsEditable(editableTodo);
    setIsOpen(true);
  };

  // fetch todos
  const {
    isLoading,
    isError,
    error,
    data: allTodos,
  } = useQuery({
    queryKey: ["Todos"],
    queryFn: () => getTodosApi(user?.email),
  }) || {};

  useEffect(()=>{
    setTodos(allTodos)
  }, [allTodos])

  // useEffect(() => {
  //   setTodos(allTodos)
  // }, [allTodos]);

  useEffect(() => {
    fetch(`https://user-management-server-sand.vercel.app/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoggedUser(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Logout User
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout Successfully", { autoClose: 1000 });
        navigate("/");
      })
      .catch((error) => toast(error.message));
  };

  //Search by title
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchedTitle = form.search.value;
    axios.get(`https://user-management-server-sand.vercel.app/searchByTitle?email=${user?.email}&title=${searchedTitle}`)
    .then(response => {
      setTodos(response.data)
    })
    .catch(error => {
      toast.error(error.message, {autoClose:1000})
    })
  };

  //Search by title
  const handleFilterByComplete = (e) => {
    e.preventDefault();
    const filterTxt = e.target.innerText;
    setFilter(filterTxt)
    axios.get(`https://user-management-server-sand.vercel.app/filterByComplete?email=${user?.email}&filterTxt=${filterTxt}`)
    .then(response => {
      setTodos(response.data)
    })
    .catch(error => {
      toast.error(error.message, {autoClose:1000})
    })
  };

  //Toggle Night Mode
  const handleDarkMode = ()=>{
    setIsDarkMode(!isDarkMode);
  }
  return (
    <div className={`min-h-screen flex justify-center items-center flex-col ${isDarkMode ? "bg-black" : ""}`}>
      <div className="rounded-3xl lg:p-6 p-3 flex flex-col relative shadow-lg border-2 border-solid border-gray-300 lg:min-w-[500px] min-w-[95%] my-2 md:min-w-[500px] text-[#1E1A52]">
        <header className={`relativ ${isDarkMode ? "text-white" : ""}`}>
          {/* <!-- day/night mode icon --> */}
          <div className="h-10 w-10 rounded-full absolute right-0">
            {
              isDarkMode 
              ? 
              <BsSun onClick={handleDarkMode} className={`text-3xl ${isDarkMode ? "text-white" : ""}`}></BsSun>
              :
              <BsMoonStars onClick={handleDarkMode} className={`text-3xl ${isDarkMode ? "text-white" : ""}`}></BsMoonStars>
            }
              
          </div>
          {/* <!-- avatar start  --> */}
          <div className="avatar relative">
            <div className="w-24 rounded-full">
              <img
                onClick={() => setShowProfile(!showProfile)}
                id="avatar"
                className="cursor-pointer"
                src={loggedUser?.photo}
              />
              {/* Options  */}
              <div
                id="profile-menu"
                className={`bg-[#fff] drop-shadow-lg text-black p-4 absolute lg:left-24 md:left-24 left-2 lg:top-[20px] md:top-[20px] top-[100%] lg:rounded-tr-full lg:rounded-br-full md:rounded-tr-full md:rounded-br-full rounded-br-full lg:rounded-bl-none rounded-bl-full ${
                  showProfile ? "" : "hidden"
                }`}
              >
                <ul className="flex lg:flex-row md:flex-row flex-col gap-3">
                  <li className="cursor-pointer hover:text-[#9500FF]">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#9500FF]">
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#9500FF]">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- avatar end  --> */}
          <Greeting user={loggedUser?.name}></Greeting>
          {/* <!-- search field start  --> */}
          <form action="#" onSubmit={handleSearch}>
            <div className="form-control mb-7">
              <input
                type="text"
                name="search"
                placeholder="Search todo"
                className={`input input-bordered rounded-full border-[1px] border-solid border-gray-300 ${isDarkMode ? "bg-black text-gray-300" : ""}`}
              />
            </div>
          </form>
          {/* <!-- search field end  --> */}

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[#A2A2BA]"> {moment().format("LL")} </p>
              <h1 className="font-semibold lg:text-4xl text-2xl">
                Today's Tasks
              </h1>
            </div>
          </div>
          <nav className="flex gap-5 mb-6">
            <p onClick={handleFilterByComplete} className={`${filter==="All" && isDarkMode ? "text-white font-bold" : filter==="All" && !isDarkMode ? "text-black font-bold": "text-gray-500"} cursor-pointer`}>All</p>
            <p onClick={handleFilterByComplete} className={`${filter==="Completed" && isDarkMode ? "text-white font-bold" : filter==="Completed" && !isDarkMode ? "text-black font-bold": "text-gray-500"} cursor-pointer`}>Completed</p>
            <p onClick={handleFilterByComplete} className={`${filter==="Incompleted" && isDarkMode ? "text-white font-bold" : filter==="Incompleted" && !isDarkMode ? "text-black font-bold": "text-gray-500"} cursor-pointer`}>Incompleted</p>
          </nav>
        </header>
        {isLoading ? (
          <h1>Loading......</h1>
        ) : (
          <main className="relative" id="todos-container">
            {todos?.length === 0 && (
              <p className="text-center text-gray-400 font-bold text-2xl">
                No Tasks Available
              </p>
            )}
            {todos?.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                handleEditTodo={handleEditTodo}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
              ></TodoItem>
            ))}
          </main>
        )}
        <footer className="flex justify-center mt-20 z-[2]">
          <button
            onClick={handleModal}
            className={`z-[1] text-white lg:px-5 lg:py-3 px-3 py-2 rounded-lg absolute bottom-5 ${isDarkMode ? "border-2 border-solid border-gray-500" : "bg-[#9500FF]"}`}
          >
            <i className="fa-solid fa-plus"></i>
            <span> Create Task</span>
          </button>
        </footer>
      </div>
      {/* <!-- modal start  --> */}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        current={current}
        setCurrent={setCurrent}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
      ></Modal>
      {/* <!-- modal end  --> */}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Todo;
