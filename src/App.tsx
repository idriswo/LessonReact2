import { useFormik } from 'formik'
import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addData, deleteData, getData } from './reduser/todoSlice'
const App = memo(() => {
  const dispatch=useDispatch()
  const data  = useSelector((state:any)=> state.todo.data)


  const {values,handleChange,handleSubmit} = useFormik({
    initialValues:{
      name:"",
      description:""
    },
    onSubmit: values => {
      dispatch(addData(values))
    }
  })



  useEffect(()=>{
    dispatch(getData())

  }, [])
  
  return (
    <>
    <div style={{display:"flex",gap:"10px",justifyContent:"center"}}>
      <form onSubmit={handleSubmit}>
      <input type="text" name='name' onChange={handleChange} placeholder='name' />
      <input type="text" name='description' onChange={handleChange} placeholder='description' />
      <button type='submit'>add</button>
      </form>
    </div>
    {
      data.map((el)=> {
        return <div key={el.id}>
          <h1>{el.name}</h1>
          <p>{el.description}</p>
          <div>
            <button onClick={()=>dispatch(deleteData(el.id))}>delete</button>
            <button>edit</button>
          </div>
        </div>
      })
    }
    </>
  )
})

export default App