import axios from "axios";
import { atom } from "jotai";
import { atomWithRefresh, loadable } from "jotai/utils";
export const refreshAtom = atom(false)


const api = "https://to-dos-api.softclub.tj/api/to-dos"

export const getDataAtom = atomWithRefresh(async (get) => {
    try {
        const { data } = await axios.get(api)
        return data.data
    } catch (error) {
        console.error(error);

    }
})

export const deleteAtom = atom(
    null,
    async (get, set, id) => {
        try {
            await axios.delete(`${api}?id=${id}`)
            set(getDataAtom)
        } catch (error) {
            console.error(error);
        }
    })


export const addAtom = atom(
    null,
    async (get, set, data: any) => {
        try {
            await axios.post(api, data)
            set(getDataAtom)
        } catch (error) {
            console.error(error);
        }
    })




export const getLoadableAtom = loadable(getDataAtom)