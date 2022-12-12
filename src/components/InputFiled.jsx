import React from 'react'

function InputFiled({ text, handleInput, handleSubmit }) {
  return (
    <label>
      <input
        value={text}
        onChange={e => handleInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Post</button>
    </label>
  )
}

export default InputFiled