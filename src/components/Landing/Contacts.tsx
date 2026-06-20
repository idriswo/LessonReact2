import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Contacts = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="contacts" className="py-24 bg-white dark:bg-slate-900 text-center transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">{t('contacts.title', 'Готовы навести порядок в финансах?')}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
          {t('contacts.subtitle', 'Присоединяйтесь к тысячам пользователей, которые уже доверили нам учет своих долгов. Свяжитесь с нами, если у вас есть вопросы!')}
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 px-6 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0a5c53] dark:text-[#7df5a5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300 font-medium">support@qarznoma.tj</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 px-6 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0a5c53] dark:text-[#7df5a5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300 font-medium">+992 00 000 0000</span>
          </div>
        </div>

        <NavLink 
          to="/signup" 
          className="inline-flex items-center justify-center bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#084b43] dark:hover:bg-[#6be494] shadow-xl shadow-[#0a5c53]/20 dark:shadow-[#7df5a5]/20 transition-transform hover:-translate-y-1"
        >
          {t('contacts.btn', 'Создать аккаунт прямо сейчас')}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </NavLink>
      </div>
    </section>
  )
})
