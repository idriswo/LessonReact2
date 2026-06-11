import { atom } from 'jotai'

export interface UserJotai{
    id:number;
    status:boolean;
    role:string;
    address:string;
}

export const atomUser = atom<UserJotai[]>([
    {
        id:1,
        status:false,
        role:'programmer',
        address:'Dushanbe'
    },
    {
        id:2,
        status:false,
        role:'programmer',
        address:'Dushanbe'
    },
    {
        id:3,
        status:false,
        role:'programmer',
        address:'Dushanbe'
    }
])   

export const atomStatus = atom<boolean>(false)
export const atomRole = atom<string>('')
export const atomAddress = atom<string>('')

export const addUserJotai = atom(null, (get, set, id: number) => {
    const newUser = {
        id,
        status: get(atomStatus),
        role: get(atomRole),
        address: get(atomAddress)
    };
    set(atomUser, [...get(atomUser), newUser]);
});

export const editUserJotai = atom(null, (get, set, id: number) => {
    const updatedStatus = get(atomStatus);
    const updatedRole = get(atomRole);
    const updatedAddress = get(atomAddress);
    
    set(atomUser, get(atomUser).map(u => 
        u.id === id ? { ...u, status: updatedStatus, role: updatedRole, address: updatedAddress } : u
    ));
});
