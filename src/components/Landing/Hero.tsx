import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const Hero = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative bg-gradient-to-br from-[#e0f7f4]/40 dark:from-[#0a5c53]/10 to-white dark:to-slate-900 overflow-hidden py-20 lg:py-32 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 transition-colors">
            {t('hero.title1')} <span className="text-[#0a5c53] dark:text-[#7df5a5]">{t('hero.title2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed transition-colors">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink 
              to="/signup" 
              className="bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#084b43] dark:hover:bg-[#6be494] shadow-lg shadow-[#0a5c53]/30 dark:shadow-[#7df5a5]/20 transition-all hover:-translate-y-1"
            >
              {t('hero.start')}
            </NavLink>
            <a 
              href="#features" 
              className="bg-white dark:bg-slate-800 text-[#0a5c53] dark:text-[#7df5a5] border-2 border-[#0a5c53]/10 dark:border-[#7df5a5]/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
            >
              {t('hero.how_it_works')}
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#7df5a5]/20 dark:bg-[#7df5a5]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/4 w-[30rem] h-[30rem] bg-[#0a5c53]/10 dark:bg-[#0a5c53]/20 rounded-full blur-3xl"></div>
    </section>
  )
})
