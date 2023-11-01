import axios from 'axios'

const postTodoApi = async(newTodo) => {
  const response = await axios.post("http://localhost:8000/todos", newTodo);
  return response.data;
}

export default postTodoApi