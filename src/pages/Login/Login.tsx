import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { axiosRequest } from '../../store/login'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const loginSchema = z.object({
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

type LoginFormValues = z.infer<typeof loginSchema>

const Login = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axiosRequest.post('/auth/login', data)
      login(response.data.accessToken, response.data.refreshToken)
      toast.success(t('auth.login_success', 'Добро пожаловать!'))
      navigate('/home')
    } catch (error) {
      toast.error(t('auth.login_error', 'Неверный email или пароль!'))
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7f4] to-[#c7f0e9] dark:from-slate-950 dark:to-slate-900 p-4 font-sans relative transition-colors">
      <NavLink to="/" className="absolute top-6 left-6 flex items-center gap-2 text-[#0a5c53] dark:text-[#7df5a5] font-medium hover:underline bg-white dark:bg-slate-800 px-5 py-2.5 rounded-full shadow-sm transition-all hover:-translate-y-0.5">
        <ArrowLeft className="h-4 w-4" />
        {t('common.back_home', 'На главную')}
      </NavLink>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-900 w-full max-w-[26rem] rounded-[2rem] shadow-xl p-8 sm:p-10 transition-colors"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#0a5c53] dark:bg-slate-800 rounded-[1.2rem] flex items-center justify-center mb-4 shadow-sm transition-colors">
            <Lock className="h-6 w-6 text-white dark:text-[#7df5a5]" />
          </div>
          <h1 className="text-[1.35rem] font-bold text-[#0a5c53] dark:text-[#7df5a5] mb-1">{t('app.name')}</h1>
          <p className="text-[0.8rem] text-gray-600 dark:text-gray-400">{t('auth.login_subtitle', 'Войдите в свой аккаунт')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600 dark:text-gray-300 font-semibold">
              {t('profile.email', 'Электронная почта')}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                id="email"
                placeholder="email@example.com"
                className={`pl-10 h-11 rounded-xl bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white focus-visible:ring-[#0a5c53] dark:focus-visible:ring-[#7df5a5] ${errors.email ? 'border-red-500' : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600 dark:text-gray-300 font-semibold">
              {t('auth.password', 'Пароль')}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                className={`pl-10 h-11 rounded-xl bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white focus-visible:ring-[#0a5c53] dark:focus-visible:ring-[#7df5a5] font-medium tracking-widest ${errors.password ? 'border-red-500' : ''}`}
                {...register('password')}
              />
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-[0.75rem] font-medium text-[#0a5c53] dark:text-[#7df5a5] hover:underline">
              {t('auth.forgot_password', 'Забыли пароль?')}
            </a>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#0a5c53] dark:bg-[#7df5a5] text-white dark:text-[#0a5c53] rounded-[1rem] hover:bg-[#084b43] dark:hover:bg-[#6be494] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#0a5c53]/20 dark:shadow-none text-[0.95rem]"
          >
            {isSubmitting ? t('auth.login_loading', 'Вход...') : t('auth.login_submit', 'Войти')}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[0.8rem] text-gray-600 dark:text-gray-400">
            {t('auth.no_account', 'Нет аккаунта?')} {' '}
            <NavLink to="/signup" className="font-semibold text-[#0a5c53] dark:text-[#7df5a5] hover:underline">
              {t('auth.register_link', 'Зарегистрируйтесь')}
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  )
})

export default Login