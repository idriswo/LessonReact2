import { memo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const Features = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('features.title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">{t('features.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#f8f9fc] dark:bg-slate-800 rounded-[2rem] p-10 hover:shadow-xl dark:hover:shadow-slate-700/30 transition-shadow duration-300 border border-gray-50 dark:border-slate-700"
          >
            <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-[#0a5c53] dark:text-[#7df5a5]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('features.f1_title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('features.f1_desc')}
            </p>
          </motion.div>

          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#f8f9fc] dark:bg-slate-800 rounded-[2rem] p-10 hover:shadow-xl dark:hover:shadow-slate-700/30 transition-shadow duration-300 border border-gray-50 dark:border-slate-700"
          >
            <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-red-500 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('features.f2_title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('features.f2_desc')}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#f8f9fc] dark:bg-slate-800 rounded-[2rem] p-10 hover:shadow-xl dark:hover:shadow-slate-700/30 transition-shadow duration-300 border border-gray-50 dark:border-slate-700"
          >
            <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-[#0a5c53] dark:text-[#7df5a5]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('features.f3_title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('features.f3_desc')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
