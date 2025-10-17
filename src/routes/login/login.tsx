import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Heading, Hint, Input, Text } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import * as z from "zod"

import { Form } from "../../components/common/form"
import { useDashboardExtension } from "../../extensions"
import { useSignInWithEmailPass } from "../../hooks/api"
import { isFetchError } from "../../lib/is-fetch-error"

const LoginSchema = z.object({
  email: z.string().email("لطفاً یک ایمیل معتبر وارد کنید"),
  password: z.string().min(1, "رمز عبور الزامی است"),
})

export const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const reason = searchParams.get("reason") || ""

  const { getWidgets } = useDashboardExtension()

  const from = "/dashboard"

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutateAsync, isPending } = useSignInWithEmailPass()

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    await mutateAsync(
      {
        email,
        password,
      },
      {
        onError: (error) => {
          if (isFetchError(error)) {
            if (error.status === 401) {
              form.setError("email", {
                type: "manual",
                message: "ایمیل یا رمز عبور اشتباه است",
              })

              return
            }
          }

          form.setError("root.serverError", {
            type: "manual",
            message: "خطا در ورود. لطفاً دوباره تلاش کنید.",
          })
        },
        onSuccess: () => {
          setTimeout(() => {
            navigate(from, { replace: true })
          }, 500)
        },
      }
    )
  })

  const serverError =
    form.formState.errors?.root?.serverError?.message || reason
  const validationError =
    form.formState.errors.email?.message ||
    form.formState.errors.password?.message

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform">
            <Text className="text-white font-bold text-3xl">I</Text>
          </div>
          <Heading className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            خوش آمدید به Innjaa
          </Heading>
          <Text size="small" className="text-gray-600 dark:text-gray-400">
            پنل فروشندگان - وارد حساب خود شوید
          </Text>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90">
          <div className="flex w-full flex-col gap-y-6">
            {getWidgets("login.before").map((Component, i) => {
              return <Component key={i} />
            })}
            
            <Form {...form}>
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-y-6"
              >
                <div className="flex flex-col gap-y-4">
                  {/* Email Field */}
                  <Form.Field
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <Form.Item>
                          <Form.Label className="text-gray-700 dark:text-gray-300 font-medium">
                            ایمیل
                          </Form.Label>
                          <Form.Control>
                            <div className="relative">
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <Input
                                autoComplete="email"
                                {...field}
                                className="pr-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                placeholder="email@example.com"
                                dir="ltr"
                              />
                            </div>
                          </Form.Control>
                        </Form.Item>
                      )
                    }}
                  />

                  {/* Password Field */}
                  <Form.Field
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <Form.Item>
                          <Form.Label className="text-gray-700 dark:text-gray-300 font-medium">
                            رمز عبور
                          </Form.Label>
                          <Form.Control>
                            <div className="relative">
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </div>
                              <Input
                                type="password"
                                autoComplete="current-password"
                                {...field}
                                className="pr-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                placeholder="رمز عبور خود را وارد کنید"
                              />
                            </div>
                          </Form.Control>
                        </Form.Item>
                      )
                    }}
                  />
                </div>

                {/* Forgot Password Link */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/reset-password"
                    className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </Link>
                </div>

                {/* Error Messages */}
                {validationError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <Text className="text-red-600 dark:text-red-400 text-sm">
                      {validationError}
                    </Text>
                  </div>
                )}
                {serverError && (
                  <Alert
                    className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                    dismissible
                    variant="error"
                  >
                    {serverError}
                  </Alert>
                )}

                {/* Login Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                  type="submit" 
                  isLoading={isPending}
                >
                  {isPending ? "در حال ورود..." : "ورود به پنل"}
                </Button>
              </form>
            </Form>
            
            {getWidgets("login.after").map((Component, i) => {
              return <Component key={i} />
            })}
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">یا</span>
            </div>
          </div>

          {/* Register Link */}
          {__DISABLE_SELLERS_REGISTRATION__ === "false" && (
            <div className="text-center">
              <Text size="small" className="text-gray-600 dark:text-gray-400">
                هنوز حساب کاربری ندارید؟{" "}
                <Link
                  to="/register"
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold transition-colors"
                >
                  ثبت‌نام کنید
                </Link>
              </Text>
            </div>
          )}

          {/* Terms Link */}
          <div className="text-center mt-4">
            <Link
              to="/terms"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              قوانین و مقررات
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <Text size="xsmall" className="text-gray-500 dark:text-gray-400">
            © ۱۴۰۳ Innjaa. تمامی حقوق محفوظ است.
          </Text>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
