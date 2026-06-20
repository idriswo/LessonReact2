import { memo, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { axiosRequest } from '../../store/login'
import toast from 'react-hot-toast'
import ContactModal from '../../components/Modals/ContactModal'
import DebtModal from '../../components/Modals/DebtModal'
import { confirmToast } from '../../utils/confirmToast'
import { useContactStore } from '../../store/useContactStore'
import { Button } from '../../components/ui/button'
import { Home as HomeIcon, Users, Bell, User, Plus, Search, Edit2, Trash2, Globe, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { useThemeStore } from '../../store/useThemeStore'

const Partners = memo(() => {
  const { t, i18n } = useTranslation();
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  const { contacts, loading, fetchContacts } = useContactStore();
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [editContactData, setEditContactData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  async function handleDeleteContact(id: string) {
    confirmToast(t('partners.confirm_delete', "Вы уверены, что хотите удалить этого партнера?"), async () => {
      try {
        await axiosRequest.delete(`/contacts/${id}`);
        toast.success(t('partners.delete_success', "Партнер успешно удален"));
        fetchContacts();
      } catch (error) {
        console.log(error);
        toast.error(t('partners.delete_error', "Ошибка при удалении партнера"));
      }
    });
  }
  
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('hero.subtitle', 'Управление долгами')}</p>
          </div>
          <nav className="flex flex-col gap-2 px-4 mt-8">
            <NavLink to="/home" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <HomeIcon className="h-5 w-5" />
              {t('navigation.dashboard')}
            </NavLink>
            <NavLink to="/partners" className="flex items-center gap-3 px-4 py-3 bg-[#7df5a5] dark:bg-[#0a5c53]/20 text-[#0a5c53] dark:text-[#7df5a5] rounded-xl font-semibold transition-colors">
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
            className="w-full bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] py-6 rounded-[1rem] font-medium hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors flex items-center justify-center gap-2 shadow-md text-base"
          >
            <Plus className="h-5 w-5" />
            {t('dashboard.new_debt')}
          </Button>
        </div>
      </motion.aside>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 overflow-y-auto px-10 py-10 bg-[#f8f9fc] dark:bg-slate-950 transition-colors"
      >
        
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-[2rem] font-bold text-gray-800 dark:text-white mb-2">{t('partners.title', 'Партнеры')}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('partners.subtitle', 'Список лиц, с которыми у вас финансовые операции.')}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder={t('partners.search', 'Поиск партнера...')} 
                className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c53]/20 dark:focus:ring-[#7df5a5]/20 dark:text-white w-64 shadow-sm transition-colors"
              />
            </div>
            
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
            
            <Button 
              onClick={() => {
                setEditContactData(null);
                setContactModalOpen(true);
              }}
              className="bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] px-5 py-5 rounded-xl font-medium hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('partners.new_partner', 'Новый партнер')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400">{t('common.loading')}</div>
          ) : contacts.length === 0 ? (
            <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400">{t('partners.empty', 'У вас пока нет партнеров')}</div>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-none border-l-4 border-gray-200 dark:border-slate-700 relative flex flex-col justify-between h-40 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-lg uppercase transition-colors">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">{contact.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{contact.phone || contact.email || t('common.no_contacts', 'Нет контактов')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setEditContactData(contact);
                        setContactModalOpen(true);
                      }}
                      className="text-gray-400 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] p-1 transition-colors"
                      title={t('common.edit', 'Изменить')}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                      title={t('common.delete', 'Удалить')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-end border-t border-gray-50 dark:border-slate-800 pt-3 transition-colors">
                  <span className="text-[0.65rem] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('common.note', 'Заметка')}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{contact.note || '—'}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => {
            setContactModalOpen(false);
            setEditContactData(null);
          }} 
          onSuccess={fetchContacts} 
          editData={editContactData}
        />

        <DebtModal 
          isOpen={isDebtModalOpen}
          onClose={() => setIsDebtModalOpen(false)}
          onSuccess={() => {}} 
        />
      </motion.main>
    </div>
  )
})

export default Partners