import axios from "axios";

const deleteApi = async (id) => {
  const response = await axios.delete(
    `https://user-management-server-sand.vercel.app/todos/${id}`
  );
  return response.data;
};

export default deleteApi;
