import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store/store'
import { addTodo, editTodo, deleteTodo } from './reducer/todoSlice'

const App = memo(() => {
  const todos = useSelector((state: RootState) => state.todo.data)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      dispatch(editTodo({ id: editId, title, description }));
      setEditId(null);
    } else {
      dispatch(addTodo({ id: Date.now(), title, description }));
    }
    setTitle('');
    setDescription('');
  };

  const handleEdit = (el: any) => {
    setEditId(el.id);
    setTitle(el.title);
    setDescription(el.description);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800"></h1>
      
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            placeholder="Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            placeholder="Description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            {editId !== null ? "Edit" : "Add"}
          </button>
          {editId !== null && (
            <button 
              type="button" 
              onClick={() => {
                setEditId(null);
                setTitle('');
                setDescription('');
              }}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {todos.map(el => (
          <div key={el.id} className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-start bg-white">
            <div className="mr-4">
              <h2 className="text-xl font-semibold text-gray-800">{el.title}</h2>
              <p className="text-gray-600 mt-1">{el.description}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(el)} 
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button 
                onClick={() => dispatch(deleteTodo(el.id))}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default App