import { memo, useEffect } from 'react';
import { axiosRequest } from '../../store/login';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: Record<string, any> | null;
}

const contactSchema = z.object({
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  phone: z.string().optional(),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  note: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactModal = memo(({ isOpen, onClose, onSuccess, editData }: ContactModalProps) => {
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      note: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        reset({
          name: editData.name || '',
          phone: editData.phone || '',
          email: editData.email || '',
          note: editData.note || '',
        });
      } else {
        reset({
          name: '',
          phone: '',
          email: '',
          note: ''
        });
      }
    }
  }, [isOpen, editData, reset]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      if (editData) {
        await axiosRequest.patch(`/contacts/${editData.id}`, data);
        toast.success(t('partners.edit_success', "Данные партнера обновлены"));
      } else {
        await axiosRequest.post('/contacts', data);
        toast.success(t('partners.add_success', "Партнер успешно добавлен"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(editData ? t('partners.edit_error', "Ошибка при обновлении партнера") : t('partners.add_error', "Ошибка при добавлении партнера"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white dark:bg-slate-900 border-none transition-colors">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white">
            {editData ? t('partners.edit_partner', 'Изменить партнера') : t('partners.new_partner', 'Новый партнер')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.name', 'ФИО')} *</Label>
            <Input
              id="name"
              placeholder="Иван Иванов"
              className={`bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl focus-visible:ring-[#0a5c53]/20 dark:focus-visible:ring-[#7df5a5]/20 transition-colors ${errors.name ? 'border-red-500' : ''}`}
              {...register('name')}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.phone', 'Номер телефона')}</Label>
            <Input
              id="phone"
              placeholder="+992 90 000 0000"
              className="bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl focus-visible:ring-[#0a5c53]/20 dark:focus-visible:ring-[#7df5a5]/20 transition-colors"
              {...register('phone')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.email', 'Электронная почта')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              className={`bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl focus-visible:ring-[#0a5c53]/20 dark:focus-visible:ring-[#7df5a5]/20 transition-colors ${errors.email ? 'border-red-500' : ''}`}
              {...register('email')}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('common.note', 'Заметка')}</Label>
            <textarea
              id="note"
              rows={3}
              placeholder={t('common.note_placeholder', 'Дополнительная информация')}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c53]/20 dark:focus:ring-[#7df5a5]/20 resize-none transition-colors"
              {...register('note')}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] py-6 rounded-xl font-medium hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors shadow-md disabled:opacity-70"
            >
              {isSubmitting ? t('common.saving', 'Сохранение...') : (editData ? t('common.save', 'Сохранить изменения') : t('partners.save_partner', 'Добавить партнера'))}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default ContactModal;
