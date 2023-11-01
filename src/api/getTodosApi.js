import axios from "axios"

const getTodosApi = async() => {
  const response = await axios.get("http://localhost:8000/todos");
  return response.data;
}

export default getTodosApi