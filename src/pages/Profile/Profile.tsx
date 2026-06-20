import { memo, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { axiosRequest } from '../../store/login'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Home as HomeIcon, Users, Bell, User, Plus, Settings, Globe, CircleDollarSign, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { useThemeStore } from '../../store/useThemeStore'

const Profile = memo(() => {
  const { t, i18n } = useTranslation();
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchUser() {
    try {
      const { data } = await axiosRequest.get('/users/me');
      setUser(data);
      setName(data.name);
    } catch (error) {
      console.log(error);
      toast.error("Не удалось загрузить профиль");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleSave() {
    if (!name.trim()) return;
    try {
      setSaving(true);
      const { data } = await axiosRequest.patch('/users/me', { name });
      setUser(data);
      toast.success("Профиль успешно обновлен");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при обновлении профиля");
    } finally {
      setSaving(false);
    }
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
            <NavLink to="/partners" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <Users className="h-5 w-5" />
              {t('navigation.partners')}
            </NavLink>
            <NavLink to="/reminders" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] rounded-xl font-medium transition-colors">
              <Bell className="h-5 w-5" />
              {t('navigation.reminders')}
            </NavLink>
            <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 bg-[#7df5a5] dark:bg-[#0a5c53]/20 text-[#0a5c53] dark:text-[#7df5a5] rounded-xl font-semibold transition-colors">
              <User className="h-5 w-5" />
              {t('navigation.profile')}
            </NavLink>
          </nav>
        </div>
        
        <div className="px-4">
          <Button className="w-full bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] py-6 rounded-[1rem] font-medium hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors flex items-center justify-center gap-2 shadow-md text-base">
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
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-[2rem] font-bold text-gray-900 dark:text-white mb-2">{t('profile.settings', 'Настройки профиля')}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{t('profile.subtitle', 'Управляйте личной информацией и настройками приложения.')}</p>
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

          <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-800 flex items-center justify-between mb-6 transition-colors">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-800 shadow-sm flex items-center justify-center bg-[#0a5c53]/10 dark:bg-slate-800 text-[#0a5c53] dark:text-[#7df5a5] font-bold text-3xl uppercase transition-colors">
                {user?.name?.charAt(0) || 'Я'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {loading ? t('common.loading') : user?.name || 'Пользователь'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {loading ? '...' : user?.email || 'email@example.com'}
                </p>
              </div>
            </div>
            <button className="px-5 py-2 rounded-full border border-[#0a5c53] dark:border-[#7df5a5] text-[#0a5c53] dark:text-[#7df5a5] text-sm font-medium hover:bg-[#0a5c53]/5 dark:hover:bg-[#7df5a5]/10 transition-colors">
              {t('profile.change_photo', 'Изменить фото')}
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-800 mb-6 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-5 w-5 text-[#0a5c53] dark:text-[#7df5a5]" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t('profile.personal_info', 'Личная информация')}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.name', 'ФИО')}</Label>
                <Input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="bg-[#fbfdfc] dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl focus-visible:ring-[#0a5c53]/20 dark:focus-visible:ring-[#7df5a5]/20 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.email', 'Электронная почта')}</Label>
                <Input 
                  type="email" 
                  value={user?.email || ''} 
                  disabled
                  className="bg-gray-100 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-500 dark:text-gray-500 cursor-not-allowed transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.phone', 'Номер телефона')}</Label>
              <Input 
                type="text" 
                defaultValue="+992 " 
                disabled
                className="md:w-1/2 bg-gray-100 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-500 dark:text-gray-500 cursor-not-allowed transition-colors"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{t('profile.phone_unsupported', 'Телефон пока не поддерживается в профиле')}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleSave}
                disabled={saving || !name.trim()}
                className="bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] rounded-full font-medium hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors shadow-sm disabled:opacity-50 h-10 px-6"
              >
                {saving ? t('common.saving', 'Сохранение...') : t('common.save', 'Сохранить изменения')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="h-5 w-5 text-[#0a5c53] dark:text-[#7df5a5]" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t('profile.general_settings', 'Общие настройки')}</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.language', 'Язык приложения')}</Label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-[#fbfdfc] dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c53]/20 dark:focus:ring-[#7df5a5]/20 text-gray-800 dark:text-white appearance-none cursor-pointer transition-colors">
                      <option>Русский</option>
                      <option>Тоҷикӣ</option>
                      <option>English</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('profile.currency', 'Основная валюта')}</Label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-[#fbfdfc] dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c53]/20 dark:focus:ring-[#7df5a5]/20 text-gray-800 dark:text-white appearance-none cursor-pointer transition-colors">
                      <option>Сомони (TJS)</option>
                      <option>Доллар США (USD)</option>
                      <option>Российский рубль (RUB)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CircleDollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-5 w-5 text-[#0a5c53] dark:text-[#7df5a5]" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t('profile.notifications', 'Уведомления')}</h3>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('profile.payment_reminders', 'Напоминания об оплате')}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('profile.payment_reminders_desc', 'Предупреждение перед днем оплаты')}</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#0a5c53] dark:bg-[#7df5a5] transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white dark:bg-[#0a5c53] shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('profile.new_debts', 'Новые долги')}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('profile.new_debts_desc', 'Оповещать при добавлении долга')}</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#0a5c53] dark:bg-[#7df5a5] transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white dark:bg-[#0a5c53] shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('profile.email_newsletter', 'Email рассылка')}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('profile.email_newsletter_desc', 'Получать отчеты на почту')}</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white dark:bg-slate-400 shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </motion.main>
    </div>
  )
})

export default Profile