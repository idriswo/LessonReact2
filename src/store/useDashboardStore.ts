import { create } from 'zustand';
import { axiosRequest } from '../store/login';
import toast from 'react-hot-toast';

interface DashboardState {
  dashboardData: Record<string, any> | null;
  loading: boolean;
  fetchDashboardData: () => Promise<void>;
  handlePayment: (debtId: string, amount: number) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dashboardData: null,
  loading: true,
  fetchDashboardData: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosRequest.get('/dashboard/summary');
      set({ dashboardData: data, loading: false });
    } catch (error) {
      console.error(error);
      toast.error("Не удалось загрузить данные дашборда");
      set({ loading: false });
    }
  },
  handlePayment: async (debtId: string, amount: number) => {
    try {
      await axiosRequest.post(`/debts/${debtId}/payments`, { amount });
      toast.success("Долг успешно оплачен");
      get().fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при оплате");
    }
  }
}));
