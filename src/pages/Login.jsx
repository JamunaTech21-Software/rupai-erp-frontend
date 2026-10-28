import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";
import { api, tokens } from "../lib/api";

// Only paths inside the dashboard are followed after sign-in.
const safeReturnTo = (value) => (value && value.startsWith("/") && !value.startsWith("//") ? value : "/");

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = safeReturnTo(searchParams.get("returnTo"));
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { username: "", password: "" } });

  if (tokens.access) return <Navigate to={returnTo} replace />;

  const onSubmit = async (values) => {
    setFormError("");
    try {
      const result = await api.public.post("/auth/login", values);
      tokens.set(result);
      navigate(returnTo, { replace: true });
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) {
        setError(key, { message });
      }
      setFormError(error.message);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-50 p-4'>
      <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
        <div className='mb-6 flex flex-col items-center gap-3 text-center'>
          <img src='/sidebar-top-logo.webp' alt='RupAi ERP' className='h-14 w-auto' />
          <div>
            <h1 className='text-xl font-bold text-primary'>Sign in</h1>
            <p className='text-sm text-slate-500'>Use your username or email and password.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
          <div>
            <label htmlFor='username' className='mb-2 block text-sm font-medium text-gray-700'>
              Username or email <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                id='username'
                type='text'
                autoComplete='username'
                autoFocus
                placeholder='admin'
                className='w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
                {...register("username", { required: "Enter your username or email" })}
              />
            </div>
            {errors.username && <p className='mt-1 text-xs text-red-500'>{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-700'>
              Password <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                id='password'
                type={showPassword ? "text" : "password"}
                autoComplete='current-password'
                placeholder='Password'
                className='w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
                {...register("password", { required: "Enter your password" })}
              />
              <button
                type='button'
                onClick={() => setShowPassword((v) => !v)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className='mt-1 text-xs text-red-500'>{errors.password.message}</p>}
          </div>

          {formError && (
            <p role='alert' className='rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600'>
              {formError}
            </p>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
