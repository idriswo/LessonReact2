import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '../../store/useThemeStore'
import { Sun, Moon, Globe } from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'

const Header = memo(() => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="max-w-[1560px] m-auto sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] m-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="w-10 h-10 bg-[#0a5c53] dark:bg-[#7df5a5] rounded-xl flex items-center justify-center mr-3 shadow-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white dark:text-[#0a5c53]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-[#0a5c53] dark:text-[#7df5a5]">
              {t('app.name')}
            </span>
          </div>

          <nav className="hidden md:flex space-x-10">
            <a href="#hero" className="text-gray-500 dark:text-gray-300 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] font-medium text-sm transition-colors">{t('header.home')}</a>
            <a href="#features" className="text-gray-500 dark:text-gray-300 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] font-medium text-sm transition-colors">{t('header.features')}</a>
            <a href="#about" className="text-gray-500 dark:text-gray-300 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] font-medium text-sm transition-colors">{t('header.about')}</a>
            <a href="#contacts" className="text-gray-500 dark:text-gray-300 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] font-medium text-sm transition-colors">{t('header.contacts')}</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] hover:bg-accent hover:text-accent-foreground outline-none">
                <Globe className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-slate-800 dark:border-slate-700">
                <DropdownMenuItem onClick={() => changeLanguage('ru')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">Русский</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('tg')} className="cursor-pointer dark:text-gray-200 dark:focus:bg-slate-700">Тоҷикӣ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full text-gray-500 dark:text-gray-300 hover:text-[#0a5c53] dark:hover:text-[#7df5a5]">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <NavLink 
              to="/login" 
              className="text-[#0a5c53] dark:text-[#7df5a5] hover:bg-[#0a5c53]/5 dark:hover:bg-[#7df5a5]/10 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
            >
              {t('header.login')}
            </NavLink>
            <NavLink 
              to="/signup" 
              className="bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#084b43] dark:hover:bg-[#6be494] shadow-md shadow-[#0a5c53]/20 dark:shadow-[#7df5a5]/20 transition-all hover:-translate-y-0.5"
            >
              {t('header.register')}
            </NavLink>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full text-gray-500 dark:text-gray-300">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <button className="text-gray-500 dark:text-gray-300 hover:text-[#0a5c53] dark:hover:text-[#7df5a5] focus:outline-none p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  )
})

export default Header