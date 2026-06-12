import { atom } from 'jotai'


export interface AddressData {
    id:number
    address:string
    status:boolean
}
export interface DataJotai {
    dataJotai:AddressData[]
}


export const dataAtom = atom<DataJotai>({
    dataJotai:[ 
        {id:1,address:"123 Main St",status:true},
        {id:2,address:"456 Elm St",status:false},
        {id:3,address:"789 Oak St",status:true}
    ]
})

export const addressAtom = atom<string>("")
export const statusAtom = atom<boolean>(false)
