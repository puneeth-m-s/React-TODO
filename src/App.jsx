import { useState } from 'react'

function App() {
  const [todo, setTodo] = useState("") // String
  const [todoList, setTodoList] = useState([])
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [editedTitle, setEditedTitle] = useState("")

  const handleInputTyping = (e) => {
    // console.log(e)
    setTodo(e.target.value)
  }

  const handleButtonClick = () => {
    if (todo == "") {
      alert("Enter todo title!")
    } else {
      //Create copy of current list
      const oldList = [...todoList]
      oldList.push({
        id: Date.now(),
        title: todo,
        isCompleted: false
      }) //Push new item to old list
      setTodoList(oldList)
      setTodo("") //Clear textbox after adding todo to todolist
    }
  }

  const handleDoneClick = (itemId) => {
    // console.log(itemId);
    const newList = todoList.map((todoItem) => {
      let item = {...todoItem}
      if(todoItem.id == itemId){
        item.isCompleted = true
      }
      return item;
    })
    setTodoList(newList)
  }

  const handleDelete = (itemId) => {
    setTodoList(todoList.filter((item) => item.id != itemId))
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

    setTodoList(todoList.map((item) =>
      item.id === itemId ? { ...item, title } : item
    ))
    setEditingTodoId(null)
    setEditedTitle("")
  }

  const handleCancelEdit = () => {
    setEditingTodoId(null)
    setEditedTitle("")
  }

  return (
    <>
      <input type='text' value={todo} onChange={handleInputTyping} />
      <button style={{ marginLeft: 10 }} onClick={handleButtonClick}>Add todo</button>
      {/* <div> Current Todo: {todo} </div> */}
      {/* <div>All todos : {JSON.stringify(todoList)}</div> */}
      <br />
      <br />
      <table border={1}>
        <tbody>
        <tr>
          <th>Sl. No.</th>
          <th>Title</th>
          <th>Is Completed?</th>
          <th>Action</th>
        </tr>
        {todoList.map((item, index) => {
          return <tr key={item.id}>
            <td>{index+1}</td>
            <td>
              {editingTodoId === item.id ? (
                <input
                  type='text'
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : item.title}
            </td>
            <td>
              {item.isCompleted ? "Yes" : "No"}
            </td>
            <td>
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
               {!item.isCompleted && (
                 <button
                   onClick={() => handleDoneClick(item.id)}
                   style={{ marginRight: 5, backgroundColor: '#0d1b4d', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4 }}
                 >
                   Done
                 </button>
               )}
               <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4 }}>
                 Delete
               </button>
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </>
  )
}

export default App
