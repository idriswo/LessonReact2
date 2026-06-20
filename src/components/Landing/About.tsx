import { memo } from 'react'
import { useTranslation } from 'react-i18next'

export const About = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-[#0a5c53] dark:bg-slate-950 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('about.title')}</h2>
          <p className="text-[#a5f3c1] dark:text-[#7df5a5] max-w-2xl mx-auto text-lg">
            Мы — команда энтузиастов, создавших Qarznoma для того, чтобы ваши финансы всегда были в порядке. 
            Начните пользоваться платформой всего за три простых шага.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-[#084b43] dark:bg-slate-800"></div>

          
          <div className="relative text-center">
            <div className="w-20 h-20 mx-auto bg-[#084b43] dark:bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-4 border-[#0a5c53] dark:border-slate-800 shadow-lg relative z-10 text-[#7df5a5]">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">{t('about.s1_title')}</h3>
            <p className="text-gray-300">{t('about.s1_desc')}</p>
          </div>

          
          <div className="relative text-center">
            <div className="w-20 h-20 mx-auto bg-[#084b43] dark:bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-4 border-[#0a5c53] dark:border-slate-800 shadow-lg relative z-10 text-[#7df5a5]">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">{t('about.s2_title')}</h3>
            <p className="text-gray-300">{t('about.s2_desc')}</p>
          </div>

          
          <div className="relative text-center">
            <div className="w-20 h-20 mx-auto bg-[#084b43] dark:bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-4 border-[#0a5c53] dark:border-slate-800 shadow-lg relative z-10 text-[#7df5a5]">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">{t('about.s3_title')}</h3>
            <p className="text-gray-300">{t('about.s3_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
})
