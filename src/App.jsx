import { useState } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState("") // String
  const [todoList, setTodoList] = useState([])
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [editedTitle, setEditedTitle] = useState("")
  const pendingTodos = todoList.filter((item) => !item.isCompleted)
  const completedTodos = todoList.filter((item) => item.isCompleted)

  const handleInputTyping = (e) => {
    setTodo(e.target.value)
  }

  const handleButtonClick = () => {
    const title = todo.trim()
    if (!title) {
      alert("Enter todo title!")
    } else {
      setTodoList((currentList) => [
        ...currentList,
        {
          id: crypto.randomUUID(),
          title,
          isCompleted: false
        }
      ])
      setTodo("")
    }
  }

  const handleCompletionChange = (itemId, isCompleted) => {
    setTodoList((currentList) => currentList.map((item) =>
      item.id === itemId ? { ...item, isCompleted } : item
    ))
  }

  const handleDelete = (itemId) => {
    setTodoList((currentList) => currentList.filter((item) => item.id !== itemId))
    if (editingTodoId === itemId) {
      setEditingTodoId(null)
      setEditedTitle("")
    }
  }

  const handleEditClick = (item) => {
    setEditingTodoId(item.id)
    setEditedTitle(item.title)
  }

  const handleSaveEdit = (itemId) => {
    const title = editedTitle.trim()
    if (!title) {
      return
    }

    setTodoList((currentList) => currentList.map((item) =>
      item.id === itemId ? { ...item, title } : item
    ))
    setEditingTodoId(null)
    setEditedTitle("")
  }

  const handleCancelEdit = () => {
    setEditingTodoId(null)
    setEditedTitle("")
  }

  const renderTaskRows = (tasks, isCompleted) => tasks.length > 0
    ? tasks.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>
          {editingTodoId === item.id ? (
            <input
              type='text'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : item.title}
        </td>
        <td>{isCompleted ? "Yes" : "No"}</td>
        <td className='task-actions'>
          {editingTodoId === item.id ? (
            <>
              <button
                disabled={!editedTitle.trim()}
                onClick={() => handleSaveEdit(item.id)}
                style={{ marginRight: 5, backgroundColor: '#2e7d32', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4 }}
              >
                Save
              </button>
              <button onClick={handleCancelEdit} style={{ marginRight: 5, backgroundColor: '#e0e0e0', color: '#000', border: 'none', padding: '6px 10px', borderRadius: 4 }}>
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEditClick(item)}
              style={{ marginRight: 5, backgroundColor: '#f4c542', color: '#000', border: 'none', padding: '6px 10px', borderRadius: 4 }}
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleCompletionChange(item.id, !isCompleted)}
            style={{ marginRight: 5, backgroundColor: '#0d1b4d', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4 }}
          >
            {isCompleted ? 'Mark Incomplete' : 'Done'}
          </button>
          <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4 }}>
            Delete
          </button>
        </td>
      </tr>
    ))
    : (
      <tr>
        <td colSpan={4} className='empty-state'>
          {isCompleted ? 'No completed tasks.' : 'No pending tasks.'}
        </td>
      </tr>
    )

  return (
    <main className='todo-app'>
      <div className='todo-entry'>
        <input aria-label='New todo title' type='text' value={todo} onChange={handleInputTyping} />
        <button style={{ marginLeft: 10 }} onClick={handleButtonClick}>Add todo</button>
      </div>

      <section className='task-section' aria-labelledby='todo-tasks-heading'>
        <h2 id='todo-tasks-heading'>Todo Tasks</h2>
        <div className='table-scroll'>
          <table>
            <thead>
              <tr>
                <th scope='col'>Sl. No.</th>
                <th scope='col'>Title</th>
                <th scope='col'>Is Completed?</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>{renderTaskRows(pendingTodos, false)}</tbody>
          </table>
        </div>
      </section>

      <section className='task-section' aria-labelledby='completed-tasks-heading'>
        <h2 id='completed-tasks-heading'>Completed Tasks</h2>
        <div className='table-scroll'>
          <table>
            <thead>
              <tr>
                <th scope='col'>Sl. No.</th>
                <th scope='col'>Title</th>
                <th scope='col'>Is Completed?</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>{renderTaskRows(completedTodos, true)}</tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default App
