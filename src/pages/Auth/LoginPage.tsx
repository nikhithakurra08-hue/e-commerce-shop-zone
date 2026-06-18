import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { login } from '../../store/slices/authSlice'

interface FormData { email: string; password: string; remember?: boolean }

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector(s => s.auth)
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>()
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  let next = search.get('next') || '/'
  if (['/login', '/signup', '/forgot-password'].includes(next)) next = '/'

  useEffect(() => { if (isAuthenticated) navigate(next, { replace: true }) }, [isAuthenticated, navigate, next])

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 600))
    dispatch(login({ ...data, remember: !!data.remember }))
    toast.success('Welcome back!')
    navigate(next, { replace: true })
  }

  return (
    <>
      <Helmet><title>Sign In — ShopZone</title></Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold text-amazon-500">ShopZone</Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Sign In</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back! Please enter your details.</p>
          </div>

          <div className="card p-8">
            {/* Demo credentials */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 mb-5 text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">Demo Credentials:</p>
              <button onClick={() => { setValue('email', 'demo@shopzone.com'); setValue('password', 'demo123') }} className="block text-blue-600 dark:text-blue-400 hover:underline">
                👤 User: demo@shopzone.com / demo123
              </button>
              <button onClick={() => { setValue('email', 'admin@shopzone.com'); setValue('password', 'admin123') }} className="block text-blue-600 dark:text-blue-400 hover:underline mt-0.5">
                🔧 Admin: admin@shopzone.com / admin123
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  type="email" className="input" placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Password</label>
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  type="password" className="input" placeholder="••••••••"
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>
              <div className="flex justify-between items-center">
                <Link to={`/forgot-password?next=${encodeURIComponent(next)}`} className="text-sm text-amazon-600 hover:underline">Forgot password?</Link>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('remember')} id="remember" className="h-4 w-4" />
                  <span className="text-gray-600">Remember me</span>
                </label>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3 text-base flex items-center justify-center gap-2">
                {isSubmitting ? 'Signing in…' : <><LogIn size={18} /> Sign In</>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Don't have an account?{' '}
              <Link to={`/signup?next=${encodeURIComponent(next)}`} className="text-amazon-600 hover:underline font-medium">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
