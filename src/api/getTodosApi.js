import axios from "axios";

const getTodosApi = async () => {
  const response = await axios.get(
    "https://user-management-server-sand.vercel.app/todos"
  );
  return response.data;
};

export default getTodosApi;
