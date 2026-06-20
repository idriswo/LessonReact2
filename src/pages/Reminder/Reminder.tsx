import { memo, useState, useEffect } from 'react'
import DebtModal from '../../components/Modals/DebtModal'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { axiosRequest } from '../../store/login'
import toast from 'react-hot-toast'
import { confirmToast } from '../../utils/confirmToast'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Home as HomeIcon, Users, Bell, User, Clock, CheckCircle, Edit2, Trash2, AlertCircle, Globe, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { useThemeStore } from '../../store/useThemeStore'
import { useDebtStore, type Debt } from '../../store/useDebtStore'
const Reminder = memo(() => {
  const { t, i18n } = useTranslation();
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const { debts, loading, fetchDebts, handlePayment } = useDebtStore();
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [editDebtData, setEditDebtData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

  async function handleDeleteDebt(id: string) {
    confirmToast(t('debts.confirm_delete', "Вы уверены, что хотите удалить этот долг?"), async () => {
      try {
        await axiosRequest.delete(`/debts/${id}`);
        toast.success(t('debts.delete_success', "Долг успешно удален"));
        fetchDebts();
      } catch (error) {
        console.log(error);
        toast.error(t('debts.delete_error', "Ошибка при удалении долга"));
      }
    });
  }

  const today = new Date();
  const urgentDebts = debts.filter((d: Debt) => {
    if (d.status === 'paid' || d.direction === 'they_owe_me' || !d.due_date) return false;
    const due = new Date(d.due_date);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diffDays <= 2;
  });
  const urgentSum = urgentDebts.reduce((sum: number, d: Debt) => sum + Number(d.amount), 0);

  return (
    <div className="flex h-screen bg-[#f8f9fc] dark:bg-slate-950 font-sans overflow-hidden transition-colors">

      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-[#f4f7f6] dark:bg-slate-900 flex flex-col justify-between py-6 border-r border-gray-200 dark:border-slate-800 shrink-0 transition-colors"
      >
        <div>
          <div className="px-8 mb-8">
            <h1 className="text-2xl font-bold text-[#0a5c53] dark:text-[#7df5a5]">{t('app.name')}</h1>
          </div>
          <nav className="flex flex-col gap-2 px-4 mt-8">
            <NavLink to="/home" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <HomeIcon className="h-5 w-5" />
              {t('navigation.dashboard')}
            </NavLink>
            <NavLink to="/partners" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <Users className="h-5 w-5" />
              {t('navigation.partners')}
            </NavLink>
            <NavLink to="/reminders" className="flex items-center gap-3 px-4 py-3 bg-[#7df5a5] dark:bg-[#0a5c53]/20 text-[#0a5c53] dark:text-[#7df5a5] rounded-xl font-semibold transition-colors">
              <Bell className="h-5 w-5" />
              {t('navigation.reminders')}
            </NavLink>
            <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <User className="h-5 w-5" />
              {t('navigation.profile')}
            </NavLink>
          </nav>
        </div>
      </motion.aside>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 overflow-y-auto px-10 py-10 bg-[#f8f9fc] dark:bg-slate-950 transition-colors"
      >

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[2rem] font-bold text-gray-900 dark:text-white mb-2">{t('navigation.reminders', 'Напоминания')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('reminders.subtitle', 'Управление предстоящими платежами.')}</p>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] hover:bg-white dark:hover:bg-slate-800 outline-none shadow-sm dark:shadow-none transition-colors border border-gray-200 dark:border-slate-800">
                <Globe className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-slate-800 dark:border-slate-700">
                <DropdownMenuItem onClick={() => changeLanguage('ru')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">Русский</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('tg')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">Тоҷикӣ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] hover:bg-white dark:hover:bg-slate-800 outline-none shadow-sm dark:shadow-none transition-colors border border-gray-200 dark:border-slate-800">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {urgentDebts.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-none border-l-4 border-red-600 relative mb-8 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('reminders.urgent', 'Срочные долги (Я отдам)')}</h3>
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-red-600 dark:text-red-500">-{urgentSum.toFixed(2)} TJS</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('reminders.urgent_desc', 'Оплата должна быть произведена сегодня или завтра')} ({urgentDebts.length} {t('common.pcs', 'шт.')}).</p>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-[1rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden transition-colors">

          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-800 bg-[#fbfdfc] dark:bg-slate-900 transition-colors">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t('reminders.list', 'Список напоминаний')}</h3>
            <button className="text-[#0a5c53] dark:text-[#7df5a5] hover:text-[#084b43] dark:hover:text-[#6be494]">
              <CheckCircle className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-x-auto p-4">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100 dark:border-slate-800">
                  <TableHead className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">{t('partners.title', 'Партнер')}</TableHead>
                  <TableHead className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">{t('common.sum', 'Сумма')}</TableHead>
                  <TableHead className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">{t('common.type', 'Тип')}</TableHead>
                  <TableHead className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">{t('debts.days_left', 'Осталось дней')}</TableHead>
                  <TableHead className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs text-right">{t('common.action', 'Действие')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-4 text-center text-gray-500 dark:text-gray-400">{t('common.loading')}</TableCell>
                  </TableRow>
                ) : debts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-4 text-center text-gray-500 dark:text-gray-400">{t('common.no_debts', 'Нет долгов')}</TableCell>
                  </TableRow>
                ) : (
                  debts.map((debt: Debt) => {
                    let daysLeft = '—';
                    let isUrgent = false;
                    if (debt.due_date && debt.status !== 'paid') {
                      const diffDays = Math.ceil((new Date(debt.due_date).getTime() - today.getTime()) / (1000 * 3600 * 24));
                      if (diffDays < 0) daysLeft = t('common.overdue', 'Просрочено');
                      else if (diffDays === 0) daysLeft = t('common.today', 'Сегодня');
                      else if (diffDays === 1) daysLeft = t('common.tomorrow', 'Завтра');
                      else daysLeft = `${diffDays} ${t('common.days', 'дн.')}`;
                      isUrgent = diffDays <= 2;
                    }

                    return (
                      <TableRow key={debt.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors border-gray-50 dark:border-slate-800">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${debt.direction === 'they_owe_me' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              }`}>
                              {debt.contact_name?.charAt(0) || '?'}
                            </div>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{debt.contact_name || 'Неизвестно'}</span>
                          </div>
                        </TableCell>
                        <TableCell className={`text-sm font-semibold ${debt.direction === 'they_owe_me' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                          {debt.direction === 'they_owe_me' ? '+' : '-'}{debt.amount} {debt.currency || 'TJS'}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
                            {debt.description || t('common.no_description', 'Без описания')}
                          </span>
                        </TableCell>
                        <TableCell className={`text-sm ${isUrgent && debt.status !== 'paid' ? 'font-semibold text-red-500 flex items-center gap-1.5' : 'text-gray-500 dark:text-gray-400'}`}>
                          {isUrgent && debt.status !== 'paid' && <Clock className="h-4 w-4" />}
                          <span className={isUrgent && debt.status !== 'paid' ? 'mt-[3px]' : ''}>{debt.status === 'paid' ? t('common.paid', 'Оплачено') : daysLeft}</span>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          {debt.status !== 'paid' && (
                            <button
                              onClick={() => handlePayment(debt.id, Number(debt.amount))}
                              className="text-xs bg-[#0a5c53]/10 dark:bg-[#7df5a5]/10 text-[#0a5c53] dark:text-[#7df5a5] hover:bg-[#0a5c53] dark:hover:bg-[#7df5a5] hover:text-white dark:hover:text-[#0a5c53] px-3 py-1.5 rounded-full transition-colors font-medium mr-2"
                            >
                              {t('common.pay', 'Оплатить')}
                            </button>
                          )}
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditDebtData(debt);
                                setIsDebtModalOpen(true);
                              }}
                              className="text-gray-400 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] p-1 transition-colors"
                              title={t('common.edit', 'Изменить')}
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDebt(debt.id)}
                              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                              title={t('common.delete', 'Удалить')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <DebtModal
          isOpen={isDebtModalOpen}
          onClose={() => {
            setIsDebtModalOpen(false);
            setEditDebtData(null);
          }}
          onSuccess={fetchDebts}
          editData={editDebtData}
        />
      </motion.main>
    </div>
  )
})

export default Reminder