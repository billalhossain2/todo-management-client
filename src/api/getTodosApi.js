import axios from "axios";

const getTodosApi = async (email) => {
  console.log(email)
  const response = await axios.get(
    `https://user-management-server-sand.vercel.app/todos/${email}`
  );
  return response.data;
};

export default getTodosApi;
