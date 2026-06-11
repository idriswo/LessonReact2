import { memo } from 'react'
import { useAtom } from 'jotai'
import { dataAtom, deleteAtom} from '../reducer/todo.Atom'

const Home = memo(() => {
  const [data, setData] = useAtom(dataAtom)
  const [,deleteAtomId] = useAtom(deleteAtom)
const handledelete =(id:number)=>{
  deleteAtomId(id)
}
  return (
    <div>
      {
        data.map((el) => {
          return <div key={el.id}>
            <h1>{el.name}</h1>
            <p>{el.job}</p>
            <button onClick={()=> handledelete(el.id)}>delete</button>
          </div>
        })
      }
    </div>
  )
})

export default Home