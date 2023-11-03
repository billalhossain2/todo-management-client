import { useContext, useRef, useState } from "react";
import Priority from "./Priority";
import { useMutation } from "@tanstack/react-query";
import postTodoApi from "../api/postTodoApi";
import queryClient from "../client/queryClient";
import updateApi from "../api/updateApi";
import { FaCross } from "react-icons/fa";
import { toast } from "react-toastify";
import { authContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { themeContext } from "../provider/ThemeProvider";
const Modal = ({
  isOpen,
  setIsOpen,
  current,
  setCurrent,
  taskTitle,
  setTaskTitle,
  isEditable,
  setIsEditable,
}) => {
  const prioritiesData = [
    { id: 1, title: "HIGH" },
    { id: 2, title: "MEDIUM" },
    { id: 3, title: "LOW" },
    { id: 4, title: "LOWEST" },
  ];
  const taskTitleRef = useRef();
  const {user} = useContext(authContext)
  const {isDarkMode} = useContext(themeContext);
  //Mutations
  const mutation = useMutation({
    mutationFn: postTodoApi,
    //invalidate and refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
  });
  const handleCreateTask = async () => {
    if(!current || !taskTitle){
      return Swal.fire("Task title and priority are mandatory!")
    }
    const priority = current;
    const newTodo = {
      email:user?.email,
      title: taskTitle,
      priority: priority,
      createdAt: new Date(),
      completed: false,
    };
    //Add new todo
    try {
      const res = await mutation.mutateAsync(newTodo);
      toast.success("Added Successfully", { autoClose: 1000, theme: isDarkMode ? "dark" : "light" });
      setCurrent("")
      setTaskTitle("")
    } catch (error) {
      toast.error(error.message, { autoClose: 2000, theme: isDarkMode ? "dark" : "light" });
    }
    setIsOpen(false);
  };

  //update mutation
  const updateMutation = useMutation({
    mutationFn: updateApi,
    //invalidate and refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
  });

  const handleUpdateTodo = async () => {
    const updateTodo = {
      ...isEditable,
      title: taskTitle,
      priority: current,
    };
    try {
      const res = await updateMutation.mutateAsync(updateTodo);
      toast.success("Updated Successfully", { autoClose: 1000, theme: isDarkMode ? "dark" : "light" });
      setTaskTitle("");
      setCurrent("");
      setIsEditable(false);
    } catch (error) {
      toast.error(error.message, { autoClose: 2000, theme: isDarkMode ? "dark" : "light" });
    }
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    !isEditable ? handleCreateTask() : handleUpdateTodo();
  };

  const handleModalHide = ()=>{
    setIsOpen(false)
    setIsEditable(false);
    setTaskTitle("");
    setCurrent("")
    
  }
  return (
    <dialog className="modal" open={isOpen}>
      <form
        method="dialog"
        className={`modal-box border-solid border-gray-600 border-[1px] shadow-lg overflow-visible relative ${isDarkMode ? "bg-black" : "bg-[#9500FF]"}`}
      >
        <i
          onClick={handleModalHide}
          className="fa-solid fa-xmark text-white cursor-pointer bg-black hover:bg-red-500 font-bold px-2 py-[1px] rounded-full absolute top-[-20px] right-[-20px] text-xl border-[1px] border-solid border-white"
        ></i>
        <h3 className="font-bold text-lg text-white">Create a new task</h3>
        <div className="border-b-2 border-solid border-[#f7f3f3] mb-10">
          <input
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
            type="text"
            placeholder="Task name"
            className={`input w-full max-w-xs py-4 text-[#faf7f7] pl-0 focus:outline-0 placeholder:text-white ${isDarkMode ? "bg-black" : "bg-[#9500FF]"}`}
          />
        </div>
        <p className="text-white mb-2">Priority</p>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 justify-between mb-10">
          {prioritiesData.map((item) => (
            <Priority
              key={item.id}
              title={item.title}
              current={current}
              setCurrent={setCurrent}
            ></Priority>
          ))}
        </div>
        <p
          onClick={handleSubmit}
          className="cursor-pointer hover:bg-[#401f57] w-[130px] text-center px-3 py-2 rounded-lg mx-auto border-2 border-solid border-white text-white font-bold"
        >
          {!isEditable ? (
            <p>
              <i className="fa-solid fa-plus me-1"></i>
              <span>Create Task</span>
            </p>
          ) : (
            "Update Task"
          )}
        </p>
      </form>
    </dialog>
  );
};

export default Modal;
