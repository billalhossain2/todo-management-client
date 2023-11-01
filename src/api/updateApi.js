import axios from 'axios';
import React from 'react'

const updateApi = async(updateTodo) => {
    const response = await axios.put(`http://localhost:8000/todos/${updateTodo.id}`, updateTodo)
    return response.data;
}

export default updateApi