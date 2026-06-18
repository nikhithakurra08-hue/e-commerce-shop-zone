import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const location = useLocation()
  const next = new URLSearchParams(location.search).get('next') || '/'
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>()

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 800))
    setSent(true)
  }

  return (
    <>
      <Helmet><title>Forgot Password — ShopZone</title></Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold text-amazon-500">ShopZone</Link>
          </div>
          <div className="card p-8">
            {sent ? (
              <div className="text-center">
                <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
                <p className="text-gray-500 text-sm mb-6">We've sent a password reset link to your email address. It may take a few minutes.</p>
                <Link to={`/login?next=${encodeURIComponent(next)}`} className="btn-primary inline-flex items-center gap-2"><ArrowLeft size={16} /> Back to Sign In</Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Forgot Password?</h1>
                <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-2"><Mail size={15} /> Email</label>
                    <input {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} type="email" className="input" placeholder="you@example.com" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3">
                    {isSubmitting ? 'Sending…' : 'Send Reset Link'}
                  </button>
                </form>
                <Link to={`/login?next=${encodeURIComponent(next)}`} className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 mt-5">
                  <ArrowLeft size={14} /> Back to Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
