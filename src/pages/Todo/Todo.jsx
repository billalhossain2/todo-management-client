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
  return (
    <div className="bg-[#ece8eedc] min-h-screen flex justify-center items-center flex-col">
      <div className="bg-[#F5F7FA] rounded-3xl lg:p-6 p-3 flex flex-col relative drop-shadow-lg lg:min-w-[500px] min-w-[95%] my-2 md:min-w-[500px] text-[#1E1A52]">
        <header className="relative">
          {/* <!-- day/night mode icon --> */}
          <div className="h-10 w-10 rounded-full absolute right-0">
            <label className="swap swap-rotate">
              {/* <!-- this hidden checkbox controls the state --> */}
              <input type="checkbox" />

              {/* <!-- sun icon --> */}
              <svg
                className="swap-on fill-[#a6a9b3] w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* <!-- moon icon --> */}
              <svg
                className="swap-off fill-[#a6a9b3] w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
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
                className="input input-bordered rounded-full bg-white"
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
            <p onClick={handleFilterByComplete} className={`${filter==="All" ? "text-[#434270] font-bold" : "text-[#b3b4c0]"} cursor-pointer`}>All</p>
            <p onClick={handleFilterByComplete} className={`${filter==="Completed" ? "text-[#434270] font-bold" : "text-[#b3b4c0]"} cursor-pointer`}>Completed</p>
            <p onClick={handleFilterByComplete} className={`${filter==="Incompleted" ? "text-[#434270] font-bold" : "text-[#b3b4c0]"} cursor-pointer`}>Incompleted</p>
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
            className="z-[1] bg-[#9500FF] text-white lg:px-5 lg:py-3 px-3 py-2 rounded-lg absolute bottom-5"
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
