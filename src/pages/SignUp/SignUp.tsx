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
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react'

const signUpSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUp = memo(() => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await axiosRequest.post('/auth/register', data)
      if (response.data.accessToken && response.data.refreshToken) {
        login(response.data.accessToken, response.data.refreshToken)
        toast.success('Регистрация прошла успешно!')
        navigate('/home')
      }
    } catch (error) {
      toast.error('Ошибка при регистрации. Проверьте данные!')
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7f4] to-[#c7f0e9] p-4 font-sans relative">
      <NavLink to="/" className="absolute top-6 left-6 flex items-center gap-2 text-[#0a5c53] font-medium hover:underline bg-white px-5 py-2.5 rounded-full shadow-sm transition-all hover:-translate-y-0.5">
        <ArrowLeft className="h-4 w-4" />
        На главную
      </NavLink>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-[26rem] rounded-[2rem] shadow-xl p-8 sm:p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#0a5c53] rounded-[1.2rem] flex items-center justify-center mb-4 shadow-sm">
            <User className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-[1.35rem] font-bold text-[#0a5c53] mb-1">Qarznoma</h1>
          <p className="text-[0.8rem] text-gray-600">Зарегистрируйтесь</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-600 font-semibold">
              Имя
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                id="name"
                placeholder="idriswo"
                className={`pl-10 h-11 rounded-xl border-gray-200 focus-visible:ring-[#0a5c53] ${errors.name ? 'border-red-500' : ''}`}
                {...register('name')}
              />
            </div>
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600 font-semibold">
              Электронная почта
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                id="email"
                placeholder="email@example.com"
                className={`pl-10 h-11 rounded-xl border-gray-200 focus-visible:ring-[#0a5c53] ${errors.email ? 'border-red-500' : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600 font-semibold">
              Пароль
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                className={`pl-10 h-11 rounded-xl border-gray-200 focus-visible:ring-[#0a5c53] font-medium tracking-widest ${errors.password ? 'border-red-500' : ''}`}
                {...register('password')}
              />
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#0a5c53] text-white rounded-[1rem] hover:bg-[#084b43] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#0a5c53]/20 text-[0.95rem]"
            >
              {isSubmitting ? 'Регистрация...' : 'Регистрация'}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[0.8rem] text-gray-600">
            Уже есть аккаунт?{' '}
            <NavLink to="/login" className="font-semibold text-[#0a5c53] hover:underline">
              Войти
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  )
})

export default SignUp
