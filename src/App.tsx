import { memo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import type { RootState } from './store/store'
// import { addTodo, deleteTodo, editTodo, inputTodo } from './reducer/todoSlice'
import Home from './home/Home'

const App = memo(() => {
  // const { data: todo, title, description } = useSelector((state: RootState) => state.todo)
  // const [editIdx, setEditIdx] = useState<number | null>(null)
  // const [isEdit,setIsEdit] = useState(false)
  // function handleEdit(el: any) {
  //   setEditIdx(el.id)
  //   dispatch(inputTodo({ key: "title", value: el.title }))
  //   dispatch(inputTodo({ key: "description", value: el.description }))
  //   setIsEdit(true)
  // }

  // const dispatch = useDispatch()
  return (
    <>

      {/* <div className='flex gap-[50px]'>
        <input type="text" value={title} onChange={(e) => dispatch(inputTodo({ key: "title", value: e.target.value }))} name="title" id="" placeholder='title' />
        <input type="text" value={description} onChange={(e) => dispatch(inputTodo({ key: "description", value: e.target.value }))} name="description" id="" placeholder='description' />
        <button onClick={() => {
          if (isEdit) {
            dispatch(editTodo(editIdx as number));
            setIsEdit(false);
            setEditIdx(null);
          } else {
            dispatch(addTodo());
          }
        }}>{isEdit ? "save" : "add"}</button>
      </div> */}

      {/* <div className='flex items-center gap-[50px]'>
        {todo.map(el => {
          return <div key={el.id}  >
            <h1>{el.title}</h1>
            <p>{el.description}</p>
            <button onClick={() => dispatch(deleteTodo(el.id))}>delete</button>
            <button onClick={() => handleEdit(el)}>edit</button>
          </div>
        })}
      </div> */}

      <Home/>
    </>
  )
})

export default App