import { memo, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/useAuthStore'
import { useDashboardStore } from '../../store/useDashboardStore'
import { axiosRequest } from '../../store/login'
import toast from 'react-hot-toast'
import DebtModal from '../../components/Modals/DebtModal'
import { confirmToast } from '../../utils/confirmToast'
import { Button } from '../../components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Home as HomeIcon, Users, Bell, User, Plus, Search, LogOut, Edit2, Trash2, Globe, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { useThemeStore } from '../../store/useThemeStore'

const Home = memo(() => {
  const { t, i18n } = useTranslation();
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [editDebtData, setEditDebtData] = useState<Record<string, any> | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'they_owe_me' | 'i_owe_them' | 'overdue'>('all');
  
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { dashboardData, loading, fetchDashboardData, handlePayment } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  async function handleDeleteDebt(id: string) {
    confirmToast(t('debts.confirm_delete', "Вы уверены, что хотите удалить этот долг?"), async () => {
      try {
        await axiosRequest.delete(`/debts/${id}`);
        toast.success(t('debts.delete_success', "Долг успешно удален"));
        fetchDashboardData();
      } catch (error) {
        console.log(error);
        toast.error(t('debts.delete_error', "Ошибка при удалении долга"));
      }
    });
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredOperations = dashboardData?.upcoming_due?.filter((item: Record<string, any>) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'they_owe_me') return item.direction === 'they_owe_me';
    if (activeTab === 'i_owe_them') return item.direction === 'i_owe_them';
    if (activeTab === 'overdue') {
      if (!item.due_date || item.status === 'paid') return false;
      const due = new Date(item.due_date);
      due.setHours(0, 0, 0, 0);
      const current = new Date();
      current.setHours(0, 0, 0, 0);
      return due.getTime() < current.getTime();
    }
    return true;
  }) || [];

  return (
    <div className="flex h-screen bg-[#f4f7f6] dark:bg-slate-950 font-sans overflow-hidden transition-colors">
      
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-[#f4f7f6] dark:bg-slate-900 flex flex-col justify-between py-6 border-r border-gray-200 dark:border-slate-800 shrink-0 transition-colors"
      >
        <div>
          <div className="px-8 mb-10">
            <h1 className="text-2xl font-bold text-[#0a5c53] dark:text-[#7df5a5]">{t('app.name')}</h1>
          </div>
          <nav className="flex flex-col gap-2 px-4">
            <NavLink to="/home" className="flex items-center gap-3 px-4 py-3 bg-[#7df5a5] dark:bg-[#0a5c53]/20 text-[#0a5c53] dark:text-[#7df5a5] rounded-xl font-semibold transition-colors">
              <HomeIcon className="h-5 w-5" />
              {t('navigation.dashboard')}
            </NavLink>
            <NavLink to="/partners" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <Users className="h-5 w-5" />
              {t('navigation.partners')}
            </NavLink>
            <NavLink to="/reminders" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <Bell className="h-5 w-5" />
              {t('navigation.reminders')}
            </NavLink>
            <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <User className="h-5 w-5" />
              {t('navigation.profile')}
            </NavLink>
          </nav>
        </div>
        
        <div className="px-4">
          <Button 
            onClick={() => setIsDebtModalOpen(true)}
            className="w-full bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] py-6 rounded-[1rem] font-medium hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors shadow-md text-base"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('dashboard.new_debt')}
          </Button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="h-20 flex items-center justify-between px-8 bg-[#f4f7f6] dark:bg-slate-950 transition-colors">
          <h2 className="text-[1.4rem] font-bold text-gray-800 dark:text-white">{t('navigation.dashboard')}</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder={t('partners.search')} 
                className="pl-9 pr-4 py-2 bg-gray-200/60 dark:bg-slate-800 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c53]/20 dark:focus:ring-[#7df5a5]/20 dark:text-white w-64 transition-colors"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] hover:bg-gray-100 dark:hover:bg-slate-800 outline-none transition-colors">
                <Globe className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-slate-800 dark:border-slate-700">
                <DropdownMenuItem onClick={() => changeLanguage('ru')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">Русский</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('tg')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">Тоҷикӣ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] hover:bg-gray-100 dark:hover:bg-slate-800 outline-none transition-colors">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            <Button 
              onClick={() => setIsDebtModalOpen(true)}
              className="bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] rounded-full hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              {t('common.add')}
            </Button>

            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 shadow-sm hover:ring-2 hover:ring-[#0a5c53]/30 dark:hover:ring-[#7df5a5]/30 transition-all cursor-pointer focus:outline-none flex items-center justify-center bg-[#0a5c53]/10 text-[#0a5c53] dark:text-[#7df5a5] font-bold text-lg"
              >
                {dashboardData?.user?.name?.charAt(0)?.toUpperCase() || 'Я'}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 py-2 z-50">
                  <NavLink 
                    to="/profile" 
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] transition-colors"
                  >
                    <User className="h-4 w-4" />
                    {t('navigation.profile')}
                  </NavLink>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('common.logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 overflow-y-auto px-8 pb-8"
        >
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border-l-4 border-green-500 transition-colors">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{t('dashboard.owe_me')}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {loading ? '...' : `+ ${dashboardData?.outstanding?.they_owe_me || 0} TJS`}
              </h3>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border-l-4 border-red-500 transition-colors">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{t('dashboard.i_owe')}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {loading ? '...' : `- ${dashboardData?.outstanding?.i_owe_them || 0} TJS`}
              </h3>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border-l-4 border-[#0a5c53] dark:border-[#7df5a5] transition-colors">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{t('dashboard.total_balance')}</p>
              <h3 className={`text-2xl font-bold ${dashboardData?.outstanding?.net_balance < 0 ? 'text-red-500 dark:text-red-400' : 'text-[#0a5c53] dark:text-[#7df5a5]'}`}>
                {loading ? '...' : `${dashboardData?.outstanding?.net_balance || 0} TJS`}
              </h3>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button 
              onClick={() => setActiveTab('all')}
              className={activeTab === 'all' ? "bg-[#7df5a5] dark:bg-[#7df5a5]/20 text-[#0a5c53] dark:text-[#7df5a5] px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-colors" : "bg-gray-200/60 dark:bg-slate-800 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"}
            >
              {t('common.all_operations', 'Все операции')}
            </button>
            <button 
              onClick={() => setActiveTab('they_owe_me')}
              className={activeTab === 'they_owe_me' ? "bg-[#7df5a5] dark:bg-[#7df5a5]/20 text-[#0a5c53] dark:text-[#7df5a5] px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-colors" : "bg-gray-200/60 dark:bg-slate-800 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"}
            >
              {t('dashboard.owe_me')}
            </button>
            <button 
              onClick={() => setActiveTab('i_owe_them')}
              className={activeTab === 'i_owe_them' ? "bg-[#7df5a5] dark:bg-[#7df5a5]/20 text-[#0a5c53] dark:text-[#7df5a5] px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-colors" : "bg-gray-200/60 dark:bg-slate-800 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"}
            >
              {t('dashboard.i_owe')}
            </button>
            <button 
              onClick={() => setActiveTab('overdue')}
              className={activeTab === 'overdue' ? "bg-[#7df5a5] dark:bg-[#7df5a5]/20 text-[#0a5c53] dark:text-[#7df5a5] px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-colors" : "bg-gray-200/60 dark:bg-slate-800 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"}
            >
              {t('common.overdue', 'Просроченные')}
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none transition-colors">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t('dashboard.recent_activity')}</h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-100 dark:border-slate-800">
                    <TableHead className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('partners.title', 'Партнер')}</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('common.sum')}</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('debts.due_date')}</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('common.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">{t('common.loading')}</TableCell>
                    </TableRow>
                  ) : filteredOperations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">{t('common.no_operations', 'Нет операций')}</TableCell>
                    </TableRow>
                  ) : (
                    filteredOperations.map((item: Record<string, any>) => (
                      <TableRow key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 border-gray-50 dark:border-slate-800 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3 py-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                              <User className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.contact_name}</span>
                          </div>
                        </TableCell>
                        <TableCell className={`text-sm font-semibold ${item.direction === 'they_owe_me' ? 'text-[#0a5c53] dark:text-[#7df5a5]' : 'text-red-500 dark:text-red-400'}`}>
                          {item.direction === 'they_owe_me' ? '+' : '-'} {item.amount} {item.currency || 'TJS'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                          {item.due_date ? new Date(item.due_date).toLocaleDateString() : '—'}
                        </TableCell>
                        <TableCell className="flex items-center justify-between py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                            item.status === 'partial' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                            'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                            {item.status === 'pending' ? t('common.pending', 'Ожидание') : item.status === 'partial' ? t('common.partial', 'Частично') : t('common.paid', 'Оплачено')}
                          </span>
                          
                          {item.status !== 'paid' && (
                            <button 
                              onClick={() => handlePayment(item.id as string, Number(item.amount))}
                              className="text-xs bg-[#0a5c53]/10 dark:bg-[#7df5a5]/10 text-[#0a5c53] dark:text-[#7df5a5] hover:bg-[#0a5c53] dark:hover:bg-[#7df5a5] hover:text-white dark:hover:text-[#0a5c53] px-3 py-1.5 rounded-full transition-colors font-medium ml-2 mr-2"
                            >
                              {t('common.pay', 'Оплатить')}
                            </button>
                          )}
                          <div className="inline-flex items-center gap-1">
                            <button 
                              onClick={() => {
                                setEditDebtData(item);
                                setIsDebtModalOpen(true);
                              }}
                              className="text-gray-400 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] p-1 transition-colors"
                              title={t('common.edit')}
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteDebt(item.id as string)}
                              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                              title={t('common.delete')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
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
            onSuccess={fetchDashboardData}
            editData={editDebtData}
          />

        </motion.main>
      </div>
    </div>
  )
})

export default Home