import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, toggleTodoComplited } from '../store/todoSlice'

function TodoItem({ id, title, completed }) {
    const dispatch = useDispatch()
    return (
        <li>
            <input type={'checkbox'} checked={completed} onChange={() => dispatch(toggleTodoComplited({ id }))} />
            <span>{title}</span>
            <span onClick={() => dispatch(deleteTodo(id))} className="delete">&times;</span>
        </li>
    )
}

export default TodoItem