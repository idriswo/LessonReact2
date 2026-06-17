import { useAtom } from 'jotai'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { addAtom, deleteAtom, getLoadableAtom } from './atom/todoAtom'

const App = memo(() => {
  const [value] = useAtom(getLoadableAtom)
  const [, setDeleteAtom] = useAtom(deleteAtom)
  const [, setAddAtom] = useAtom(addAtom)
  console.log(value);

  if (value.state === "loading") {
    return <h1>loading...</h1>
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => {
    const formData = new FormData()
    formData.append("Name", data.Name)
    formData.append("Description", data.Description)
    if (data.Images && data.Images.length > 0) {
      for (let i = 0; i < data.Images.length; i++) {
        formData.append("Images", data.Images[i])
      }
    }
    setAddAtom(formData)
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Name" {...register("Name", { required: true })} />
          <input placeholder="Description" {...register("Description", { required: true })} />
          <input type="file" multiple {...register("Images", { required: true })} />
          
          {errors.Name && <span style={{color: 'red'}}>Name is required</span>}
          {errors.Description && <span style={{color: 'red'}}>Description is required</span>}
          {errors.Images && <span style={{color: 'red'}}>Images are required</span>}
          
          <button type='submit'>Submit</button>
        </form>

      </div>




      {
        value.state === "hasData" && value.data?.map((el: any) => {
          return <div key={el.id}>
            <h1>{el.name}</h1>
            <button onClick={() => setDeleteAtom(el.id)}>delete</button>
          </div>
        })}


    </>
  )
})

export default App