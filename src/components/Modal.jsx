import { useRef, useState } from "react";
import Priority from "./Priority";
import { useMutation } from "@tanstack/react-query";
import postTodoApi from "../api/postTodoApi";
import queryClient from "../client/queryClient";
import updateApi from "../api/updateApi";
import { FaCross } from "react-icons/fa";
import { toast } from "react-toastify";
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
  //Mutations
  const mutation = useMutation({
    mutationFn: postTodoApi,
    //invalidate and refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
  });
  const handleCreateTask = async () => {
    const priority = current;
    const time = new Date().toLocaleTimeString();
    const newTodo = {
      title: taskTitle,
      priority: priority,
      createdAt: time,
      completed: false,
    };
    //Add new todo
    try {
      const res = await mutation.mutateAsync(newTodo);
      toast.success("Added Successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
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
      toast.success("Updated Successfully", { autoClose: 1000 });
    } catch (error) {
      console.log("Update error=========> ", error)
      toast.error(error.message, { autoClose: 2000 });
    }
    setIsEditable(false);
    setTaskTitle("");
  };

  const handleSubmit = (e) => {
    !isEditable ? handleCreateTask() : handleUpdateTodo();
    setIsOpen(false);
    setCurrent("");
  };
  return (
    <dialog className="modal" open={isOpen}>
      <form
        method="dialog"
        className="modal-box bg-[#9500FF] overflow-visible relative"
      >
        <i
          onClick={() => setIsOpen(false)}
          className="fa-solid fa-xmark text-white cursor-pointer bg-black hover:bg-red-500 font-bold px-2 py-[1px] rounded-full absolute top-[-20px] right-[-20px] text-xl"
        ></i>
        <h3 className="font-bold text-lg text-white">Create a new task</h3>
        <div className="border-b-2 border-solid border-[#f7f3f3] mb-10">
          <input
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
            type="text"
            placeholder="Task name"
            className="input w-full max-w-xs py-4 bg-[#9500FF] text-[#faf7f7] pl-0 focus:outline-0 placeholder:text-white"
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
