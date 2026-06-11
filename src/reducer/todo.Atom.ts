import { atom } from "jotai"
export const dataAtom = atom([
    { id: 1, name: "Idris", job: "developer" },
    { id: 2, name: "Jhon", job: "doctor" },
    { id: 3, name: "Doe", job: "inginer" },
])


export const deleteAtom = atom(null, (get, set, id) => {
    set(dataAtom, get(dataAtom).filter((el) => el.id !== id))
})