import { create } from 'zustand';
import { axiosRequest } from '../store/login';
import toast from 'react-hot-toast';

interface ContactState {
  contacts: Record<string, any>[];
  loading: boolean;
  fetchContacts: () => Promise<void>;
}

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  loading: true,
  fetchContacts: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get('/contacts');
      set({ contacts: data, loading: false });
    } catch (error) {
      console.error(error);
      toast.error("Не удалось загрузить партнеров");
      set({ loading: false });
    }
  }
}));
