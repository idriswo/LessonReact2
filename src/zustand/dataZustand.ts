import { create } from "zustand";


interface Datatype {
 id:number
 job:string
 age:number
}
interface DataZustate {
 dataZustand:Datatype[]
 jobInput: string
 ageInput: string | number
 setJobInput: (job: string) => void
 setAgeInput: (age: string | number) => void
 resetZustandInputs: () => void
 addDataZustand: (newData: Datatype) => void
 editDataZustand: (newData: Datatype) => void
}

export const useStore = create<DataZustate>((set) => ({
 dataZustand:[
    {id:1,job:"Developer",age:20},
    {id:2,job:"Designer",age:25},
    {id:3,job:"Manager",age:30}
 ],
 jobInput: "",
 ageInput: "",
 setJobInput: (job) => set({ jobInput: job }),
 setAgeInput: (age) => set({ ageInput: age }),
 resetZustandInputs: () => set({ jobInput: "", ageInput: "" }),
 addDataZustand: (newData) => set((state) => ({ dataZustand: [...state.dataZustand, newData] })),
 editDataZustand: (newData) => set((state) => ({
    dataZustand: state.dataZustand.map(item => item.id == newData.id ? newData : item)
 }))
 
}))
