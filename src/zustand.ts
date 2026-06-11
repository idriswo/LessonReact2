import { create } from 'zustand';
import type { ZustandUser } from './types';

interface ZustandState {
  data: ZustandUser[];
  addUser: (user: ZustandUser) => void;
  deleteUser: (id: number) => void;
  editUser: (user: ZustandUser) => void;
}

export const useZustandStore = create<ZustandState>((set) => {
  return {
    data: [
      {
        id: 1,
        nom: "Ali",
        familya: "Khamidov",
      }
    ],

    addUser: (user) => {
      set((state) => {
        return { data: [...state.data, user] };
      });
    },

    // Функсия барои нест кардан
    deleteUser: (id) => {
      set((state) => {
        return { data: state.data.filter((u) => u.id !== id) };
      });
    },

    // Функсия барои таҳрир кардан
    editUser: (user) => {
      set((state) => {
        return {
          data: state.data.map((u) => {
            if (u.id === user.id) {
              return user; // Маълумоти навро мегузорем
            }
            return u; // Маълумоти кӯҳна мемонад
          })
        };
      });
    }
  };
});
