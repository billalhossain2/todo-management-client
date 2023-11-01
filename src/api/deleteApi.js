import axios from 'axios'

const deleteApi = async(id) => {
  const response = await axios.delete(`http://localhost:8000/todos/${id}`)
  return response.data;
}

export default deleteApi
