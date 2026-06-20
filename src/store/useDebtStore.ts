import { create } from 'zustand';
import { axiosRequest } from './login';
import toast from 'react-hot-toast';

export interface Debt {
  id: string;
  amount: string | number;
  currency: string;
  status: 'pending' | 'paid' | 'partial';
  direction: 'they_owe_me' | 'i_owe_them';
  due_date?: string;
  contact_id: string;
  contact_name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

interface DebtState {
  debts: Debt[];
  loading: boolean;
  fetchDebts: () => Promise<void>;
  handlePayment: (debtId: string, amount: number) => Promise<void>;
}

export const useDebtStore = create<DebtState>((set, get) => ({
  debts: [],
  loading: true,
  fetchDebts: async () => {
    try {
      set({ loading: true });
      // In lessonReact2, we fetch from /debts or /dashboard/summary 
      // Actually we probably fetch from /debts
      const { data } = await axiosRequest.get('/debts');
      set({ debts: data, loading: false });
    } catch (error) {
      console.error(error);
      toast.error("Не удалось загрузить долги");
      set({ loading: false });
    }
  },
  handlePayment: async (debtId: string, amount: number) => {
    try {
      await axiosRequest.post(`/debts/${debtId}/payments`, { amount });
      toast.success("Долг успешно оплачен");
      get().fetchDebts();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при оплате");
    }
  }
}));
