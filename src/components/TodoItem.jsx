import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import deleteApi from "../api/deleteApi";
import queryClient from "../client/queryClient";
import updateApi from "../api/updateApi";
import patchTodoApi from "../api/patchTodoApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TodoItem = ({ todo, isEditable, setIsEditable, handleEditTodo }) => {
  const [visibleOptions, setVisibleOptions] = useState(false);
  const { _id, title, priority, createdAt, completed } = todo || {};
  //Mutations
  const deleteMutation = useMutation({
    mutationFn: deleteApi,
    //invalidate and refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMutation.mutateAsync(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          toast.error(error.message, { autoClose: 2000 });
        }
      }
    });
  };

  const { error, isError, isSuccess, mutateAsync } = useMutation({
    mutationFn: patchTodoApi,
    //invalidate and refetch
    onSuccess: () => {
      queryClient.invalidateQueries(["Todos"]);
    },
  });

  const toggleComplete = async (todo) => {
    try {
      const res = await mutateAsync(todo);
      toast.success("Toggled Successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <div className="todo-item flex items-center rounded-3xl bg-white drop-shadow-lg lg:p-4 p-2 lg:gap-7 gap-3 mb-5 py-5">
      <div className="lg:block md:block hidden">
        {todo.completed ? (
          <i
            onClick={() => toggleComplete(todo)}
            class="fa-solid fa-square-check text-green-700 text-2xl cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={() => toggleComplete(todo)}
            className="fa-regular fa-square text-[#a6a9b3] text-2xl cursor-pointer"
          ></i>
        )}
      </div>
      <div className="lg:border-l-[3px] flex-1 lg:border-b-[0] border-b-[3px] lg:pb-0 pb-3 border-solid border-[#9500FF] odd:border-[#eefe] lg:pl-3 pl-1">
        <h1 className={`md:text-[18px] text-[14px] font-bold ${completed && 'line-through'}`}>{title}</h1>
        <p>{createdAt}</p>
        <p className="font-medium text-[14px] lg:text-[16px]">
          {priority} Priority
        </p>
      </div>
      <div className="lg:space-x-3 md:space-x-3 space-x-1 text-2xl lg:flex md:flex lg:justify-around md:justify-end lg:w-auto md:w-auto items-center w-[100%] hidden">
        <i
          onClick={() => handleEditTodo(todo)}
          className="fa-regular fa-pen-to-square text-[#a6a9b3] cursor-pointer"
        ></i>
        <i
          onClick={() => handleDelete(_id)}
          className="fa-solid fa-xmark text-[#a6a9b3] cursor-pointer"
        ></i>
      </div>
      {/* <!-- dropdown start  --> */}
      <div className={`relative text-2xl lg:hidden md:hidden`}>
        <div onClick={()=>setVisibleOptions(!visibleOptions)} className="mb-2">
          <i className="three-dot fa-solid fa-ellipsis"></i>
        </div>
        <div
          className={`${visibleOptions ? '' : 'hidden'} duration-1000 drop-shadow-lg bg-white text-[#a6a9b3] w-40 flex justify-evenly absolute right-7 p-3
          top-[-5px]`}
        >
          {todo.completed ? (
          <i
            onClick={() => toggleComplete(todo)}
            class="fa-solid fa-square-check text-green-700 text-2xl cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={() => toggleComplete(todo)}
            className="fa-regular fa-square text-[#a6a9b3] text-2xl cursor-pointer"
          ></i>
        )}
          <i onClick={() => handleEditTodo(todo)} className="fa-regular fa-pen-to-square  cursor-pointer hover:text-[#9500ff]"></i>
          <i onClick={() => handleDelete(id)} className="fa-solid fa-xmark cursor-pointer hover:text-[#9500ff]"></i>
        </div>
      </div>
      {/* <!-- dropdown end  --> */}
    </div>
  );
};

export default TodoItem;
