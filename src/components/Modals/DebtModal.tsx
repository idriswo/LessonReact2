import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { axiosRequest } from '../../store/login';
import toast from 'react-hot-toast';
import { useContactStore } from '../../store/useContactStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface DebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: Record<string, any> | null;
}

const debtSchema = z.object({
  contact_id: z.string().min(1, 'Выберите партнера'),
  direction: z.string().min(1, 'Выберите тип долга'),
  amount: z.union([z.string(), z.number()]).transform(v => Number(v)).refine(n => n >= 0.01, 'Сумма должна быть больше 0'),
  currency: z.string().optional(),
  description: z.string().optional(),
  due_date: z.string().optional(),
});

type DebtFormValues = z.infer<typeof debtSchema>;

const DebtModal = memo(({ isOpen, onClose, onSuccess, editData }: DebtModalProps) => {
  const { t } = useTranslation();
  const { contacts, fetchContacts } = useContactStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<DebtFormValues>({
    resolver: zodResolver(debtSchema) as any,
    defaultValues: {
      contact_id: '',
      direction: 'they_owe_me',
      amount: 0,
      currency: 'TJS',
      description: '',
      due_date: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      fetchContacts();
      if (editData) {
        reset({
          contact_id: editData.contact_id || '',
          direction: editData.direction || 'they_owe_me',
          amount: Number(editData.amount) || 0,
          currency: editData.currency || 'TJS',
          description: editData.description || '',
          due_date: editData.due_date ? String(editData.due_date).substring(0, 10) : ''
        });
      } else {
        reset({
          contact_id: '',
          direction: 'they_owe_me',
          amount: 0,
          currency: 'TJS',
          description: '',
          due_date: ''
        });
      }
    }
  }, [isOpen, editData, reset, fetchContacts]);

  const onSubmit = async (data: DebtFormValues) => {
    try {
      if (editData) {
        await axiosRequest.patch(`/debts/${editData.id}`, data);
        toast.success(t('debts.edit_success', "Долг успешно обновлен"));
      } else {
        await axiosRequest.post('/debts', data);
        toast.success(t('debts.add_success', "Долг успешно добавлен"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(editData ? t('debts.edit_error', "Ошибка при обновлении долга") : t('debts.add_error', "Ошибка при добавлении долга"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white dark:bg-slate-900 border-none transition-colors">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white">
            {editData ? t('dashboard.edit_debt', 'Изменить долг') : t('dashboard.new_debt', 'Новый долг')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="contact_id" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('partners.title', 'Партнер')} *</Label>
            <select
              id="contact_id"
              className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c53]/20 dark:focus:ring-[#7df5a5]/20 transition-colors ${errors.contact_id ? 'border-red-500' : ''}`}
              {...register('contact_id')}
            >
              <option value="">{t('partners.search', 'Выберите партнера...')}</option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.name}
                </option>
              ))}
            </select>
            {errors.contact_id && <p className="text-xs text-red-500">{errors.contact_id.message}</p>}
            {contacts.length === 0 && (
              <p className="text-xs text-red-500 mt-1">{t('debts.no_partners_warning', 'Сначала добавьте партнера в разделе "Партнеры"')}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="direction" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('common.type', 'Тип долга')} *</Label>
              <select
                id="direction"
                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c53]/20 dark:focus:ring-[#7df5a5]/20 transition-colors ${errors.direction ? 'border-red-500' : ''}`}
                {...register('direction')}
              >
                <option value="they_owe_me">{t('debts.they_owe', 'Я получу (+)')}</option>
                <option value="i_owe_them">{t('debts.i_owe', 'Я отдам (-)')}</option>
              </select>
              {errors.direction && <p className="text-xs text-red-500">{errors.direction.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('common.sum', 'Сумма')} *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl focus-visible:ring-[#0a5c53]/20 dark:focus-visible:ring-[#7df5a5]/20 transition-colors ${errors.amount ? 'border-red-500' : ''}`}
                {...register('amount', { valueAsNumber: true })}
              />
              {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.currency', 'Валюта')}</Label>
              <select
                id="currency"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c53]/20 dark:focus:ring-[#7df5a5]/20 transition-colors"
                {...register('currency')}
              >
                <option value="TJS">TJS</option>
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('debts.return_date', 'Дата возврата')}</Label>
              <Input
                id="due_date"
                type="date"
                className="bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl focus-visible:ring-[#0a5c53]/20 dark:focus-visible:ring-[#7df5a5]/20 transition-colors"
                {...register('due_date')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('common.description', 'Описание')}</Label>
            <Input
              id="description"
              type="text"
              placeholder={t('debts.reason_placeholder', 'За что долг?')}
              className="bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl focus-visible:ring-[#0a5c53]/20 dark:focus-visible:ring-[#7df5a5]/20 transition-colors"
              {...register('description')}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || contacts.length === 0}
              className="w-full bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] py-6 rounded-xl font-medium hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors shadow-md disabled:opacity-70"
            >
              {isSubmitting ? t('common.saving', 'Сохранение...') : (editData ? t('common.save', 'Сохранить изменения') : t('debts.save_debt', 'Сохранить долг'))}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default DebtModal;
