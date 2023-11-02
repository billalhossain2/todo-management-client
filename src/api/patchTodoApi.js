import axios from "axios";
import React from "react";

const patchTodoApi = async (todo) => {
  const response = await axios.patch(
    `https://user-management-server-sand.vercel.app/todos/${todo._id}`,
    { completed: !todo.completed }
  );
  return response.data;
};

export default patchTodoApi;
