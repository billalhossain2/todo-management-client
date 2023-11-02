import axios from "axios";

const postTodoApi = async (newTodo) => {
  const response = await axios.post(
    "https://user-management-server-sand.vercel.app/todos",
    newTodo
  );
  return response.data;
};

export default postTodoApi;
