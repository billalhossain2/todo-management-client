import axios from 'axios';
import React from 'react'

const patchTodoApi = async(todo) => {
    const response = await axios.patch(`http://localhost:8000/todos/${todo.id}`, {completed:!todo.completed})
    return response.data;
}

export default patchTodoApi