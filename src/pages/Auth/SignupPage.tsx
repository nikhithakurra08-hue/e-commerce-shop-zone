import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { signup } from '../../store/slices/authSlice'

interface FormData { name: string; email: string; password: string; confirm: string }

export default function SignupPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector(s => s.auth)
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>()

  useEffect(() => { if (isAuthenticated) navigate('/') }, [isAuthenticated, navigate])

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 600))
    dispatch(signup({ name: data.name, email: data.email }))
    toast.success('Account created! Welcome to ShopZone 🎉')
    navigate('/')
  }

  return (
    <>
      <Helmet><title>Create Account — ShopZone</title></Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold text-amazon-500">ShopZone</Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1">Start shopping in seconds.</p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Full Name</label>
                <input {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })} className="input" placeholder="John Doe" />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
                <input {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} type="email" className="input" placeholder="you@example.com" />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Password</label>
                <input {...register('password', { required: 'Required', minLength: { value: 6, message: 'Minimum 6 characters' } })} type="password" className="input" placeholder="••••••••" />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Confirm Password</label>
                <input {...register('confirm', { required: 'Required', validate: v => v === watch('password') || 'Passwords do not match' })} type="password" className="input" placeholder="••••••••" />
                {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3 text-base flex items-center justify-center gap-2 mt-2">
                {isSubmitting ? 'Creating…' : <><UserPlus size={18} /> Create Account</>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-amazon-600 hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
