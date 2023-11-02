import axios from "axios";
import React from "react";

const updateApi = async (updateTodo) => {
  const response = await axios.put(
    `https://user-management-server-sand.vercel.app/todos/${updateTodo._id}`,
    {
      title: updateTodo.title,
      createdAt: updateTodo.createdAt,
      priority: updateTodo.priority,
      completed: updateTodo.completed,
    }
  );
  return response.data;
};

export default updateApi;
