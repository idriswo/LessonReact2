import {create} from 'zustand';

interface UserZustand{
  id:number;
  age:string;
  job:string;
}

interface Store{
  data:UserZustand[];
  age: string;
  job: string;
  inputAge: (age: string) => void;
  inputJob: (job: string) => void;
  addUserZ: (id: number) => void;
  editUserZ: (id: number) => void;
}

export const dataZustand = create<Store>((set) => ({
    data: [
        {
            id:1,
            age:'17',
            job:'programmer'
        },
        {
            id:2,
            age:'20',
            job:'programmer'
        },
        {
            id:3,
            age:'22',
            job:'programmer'
        }
    ],
    age: '',
    job: '',
    inputAge: (age) => set({ age }),
    inputJob: (job) => set({ job }),
    addUserZ: (id: number) => set((state) => ({
        data: [...state.data, { id, age: state.age, job: state.job }]
    })),
    editUserZ: (id) => set((state) => ({
        data: state.data.map(user => user.id === id ? { ...user, age: state.age, job: state.job } : user)
    })),
}))