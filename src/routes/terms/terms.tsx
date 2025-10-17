import { Container, Heading, Text } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { DocumentText, ShieldCheck, CurrencyDollar, Truck, ArrowPath } from "@medusajs/icons"

export const Terms = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-ui-bg-subtle to-ui-bg-base flex flex-col">
      {/* Header with back to login link */}
      <div className="w-full border-b bg-ui-bg-base shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Text className="text-white font-bold text-lg">I</Text>
            </div>
            <div>
              <Text size="small" weight="plus" className="text-ui-fg-base">
                innjaa
              </Text>
              <Text size="xsmall" className="text-ui-fg-muted">
                Seller Panel
              </Text>
            </div>
          </div>
          <Link
            to="/login"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors text-sm font-medium flex items-center gap-2"
          >
            بازگشت به ورود
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-y-6 p-6 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl px-8 py-16 shadow-lg text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <DocumentText className="w-10 h-10" />
            </div>
            <Heading level="h1" className="text-5xl font-bold mb-4 text-white">
              قوانین و مقررات فروشندگان
            </Heading>
            <Text className="text-xl text-purple-50 leading-relaxed max-w-3xl mx-auto">
              شرایط و قوانین استفاده از پلتفرم innjaa برای فروشندگان
            </Text>
            <Text className="text-sm text-purple-100 mt-4">
              آخرین بروزرسانی: مهر ۱۴۰۳
            </Text>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-ui-bg-base rounded-xl p-6 border border-ui-border-base hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CurrencyDollar className="w-5 h-5 text-blue-600" />
              </div>
              <Text weight="plus" className="text-ui-fg-base">کمیسیون</Text>
            </div>
            <Text className="text-2xl font-bold text-ui-fg-base">۱۰٪</Text>
            <Text size="xsmall" className="text-ui-fg-muted">از هر فروش</Text>
          </div>
          
          <div className="bg-ui-bg-base rounded-xl p-6 border border-ui-border-base hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <Text weight="plus" className="text-ui-fg-base">ارسال</Text>
            </div>
            <Text className="text-2xl font-bold text-ui-fg-base">۳ روز</Text>
            <Text size="xsmall" className="text-ui-fg-muted">حداکثر زمان</Text>
          </div>
          
          <div className="bg-ui-bg-base rounded-xl p-6 border border-ui-border-base hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <ArrowPath className="w-5 h-5 text-orange-600" />
              </div>
              <Text weight="plus" className="text-ui-fg-base">مرجوعی</Text>
            </div>
            <Text className="text-2xl font-bold text-ui-fg-base">۷ روز</Text>
            <Text size="xsmall" className="text-ui-fg-muted">حق مرجوعی</Text>
          </div>
          
          <div className="bg-ui-bg-base rounded-xl p-6 border border-ui-border-base hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
              </div>
              <Text weight="plus" className="text-ui-fg-base">پرداخت</Text>
            </div>
            <Text className="text-2xl font-bold text-ui-fg-base">هفتگی</Text>
            <Text size="xsmall" className="text-ui-fg-muted">تسویه حساب</Text>
          </div>
        </div>

        {/* Main Content */}
        <Container className="!max-w-none">
          <div className="flex flex-col gap-y-8">
            
            {/* Introduction */}
            <div className="flex flex-col gap-y-4">
              <Heading level="h2" className="text-3xl font-bold text-ui-fg-base flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white text-lg font-bold">۱</span>
                مقدمه
              </Heading>
              <div className="bg-ui-bg-base rounded-xl p-8 border border-ui-border-base shadow-sm">
                <Text className="text-ui-fg-base leading-relaxed mb-4 text-lg">
                  به پلتفرم فروشندگان innjaa خوش آمدید. با استفاده از این پلتفرم، شما موافقت می‌کنید که تمامی قوانین و مقررات ذکر شده در این سند را رعایت کنید.
                </Text>
                <Text className="text-ui-fg-subtle leading-relaxed text-base">
                  این پلتفرم به شما امکان می‌دهد تا محصولات خود را به صورت آنلاین عرضه کرده و به هزاران مشتری بالقوه دسترسی پیدا کنید. در ازای این خدمات، انتظار می‌رود که استانداردهای کیفی و اخلاقی ما را رعایت کنید.
                </Text>
              </div>
            </div>

            {/* Seller Account */}
            <div className="flex flex-col gap-y-4">
              <Heading level="h2" className="text-3xl font-bold text-ui-fg-base flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white text-lg font-bold">۲</span>
                حساب کاربری فروشنده
              </Heading>
              <div className="bg-ui-bg-base rounded-xl p-8 border border-ui-border-base shadow-sm">
                <div className="space-y-6">
                  <div>
                    <Heading level="h3" className="text-xl font-semibold mb-3 text-ui-fg-base">
                      ۲.۱ ثبت‌نام و احراز هویت
                    </Heading>
                    <ul className="list-none space-y-3 text-ui-fg-subtle mr-2">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                        <span>برای فروش در پلتفرم، باید حساب فروشنده ایجاد کنید</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                        <span>اطلاعات کسب‌وکار شما باید صحیح و کامل باشد</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                        <span>احراز هویت و ارائه مدارک معتبر الزامی است</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                        <span>باید مجوزهای قانونی لازم برای فروش محصولات را داشته باشید</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <Heading level="h3" className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
                      ۲.۲ تأیید حساب
                    </Heading>
                    <Text className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      تیم ما حساب و محصولات شما را بررسی می‌کند. این فرآیند معمولاً ۲-۳ روز کاری طول می‌کشد. ما حق رد یا تعلیق هر حسابی را که با استانداردهای ما مطابقت ندارد، محفوظ می‌داریم.
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing and Commissions - Highlighted */}
            <div className="flex flex-col gap-y-4">
              <Heading level="h2" className="text-3xl font-bold text-ui-fg-base flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white text-lg font-bold">۳</span>
                قیمت‌گذاری و کمیسیون
              </Heading>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-8 border-2 border-purple-200 dark:border-purple-800 shadow-lg">
                <div className="space-y-6">
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-6">
                    <Heading level="h3" className="text-xl font-semibold mb-3 text-purple-900 dark:text-purple-100 flex items-center gap-2">
                      <CurrencyDollar className="w-6 h-6" />
                      ۳.۱ کمیسیون پلتفرم
                    </Heading>
                    <Text className="text-purple-800 dark:text-purple-200 leading-relaxed mb-4">
                      innjaa از هر فروش موفق، کمیسیونی دریافت می‌کند:
                    </Text>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                        <Text className="text-sm text-ui-fg-muted mb-1">کمیسیون پایه</Text>
                        <Text className="text-3xl font-bold text-purple-600">۱۰٪</Text>
                        <Text className="text-xs text-ui-fg-muted mt-1">از قیمت فروش</Text>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                        <Text className="text-sm text-ui-fg-muted mb-1">فروشندگان برتر</Text>
                        <Text className="text-3xl font-bold text-green-600">۷٪</Text>
                        <Text className="text-xs text-ui-fg-muted mt-1">با شرایط خاص</Text>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-6">
                    <Heading level="h3" className="text-xl font-semibold mb-3 text-purple-900 dark:text-purple-100">
                      ۳.۲ پرداخت‌ها
                    </Heading>
                    <ul className="list-none space-y-3 text-purple-800 dark:text-purple-200">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                        <span>پرداخت‌ها به صورت هفتگی انجام می‌شود</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                        <span>حداقل موجودی برای برداشت: ۱۰۰,۰۰۰ تومان</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                        <span>پرداخت‌ها پس از تأیید تحویل محصول آزاد می‌شوند</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Prohibited Activities - Warning Style */}
            <div className="flex flex-col gap-y-4">
              <Heading level="h2" className="text-3xl font-bold text-ui-fg-base flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg text-white text-lg font-bold">⚠</span>
                فعالیت‌های ممنوع
              </Heading>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl p-8 border-2 border-red-200 dark:border-red-800 shadow-lg">
                <Text className="text-red-800 dark:text-red-200 font-semibold mb-4 text-lg">
                  فعالیت‌های زیر ممنوع بوده و می‌تواند منجر به تعلیق یا حذف دائمی حساب شود:
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "فروش محصولات جعلی یا غیرقانونی",
                    "دستکاری نظرات یا امتیازات",
                    "ایجاد چندین حساب برای سوءاستفاده",
                    "ارائه اطلاعات نادرست به مشتریان",
                    "رفتار غیرحرفه‌ای یا توهین‌آمیز",
                    "نقض حقوق مالکیت فکری دیگران"
                  ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-red-200 dark:border-red-700 flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✕</span>
                      <Text className="text-red-700 dark:text-red-300">{item}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional sections in accordion style for better UX */}
            <div className="flex flex-col gap-y-4">
              <Text className="text-ui-fg-muted text-center text-sm">
                برای مطالعه کامل قوانین، لطفاً به بخش‌های زیر مراجعه کنید یا با تیم پشتیبانی تماس بگیرید.
              </Text>
            </div>

          </div>
        </Container>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl px-8 py-12 shadow-xl text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <Heading level="h2" className="text-3xl font-bold mb-3 text-white">
              سوالی دارید؟
            </Heading>
            <Text className="text-purple-50 mb-6 text-lg">
              تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:seller-support@innjaa.com"
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ارسال ایمیل به پشتیبانی
              </a>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                ورود به پنل
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <Text className="text-purple-100 mt-6 text-sm">
              seller-support@innjaa.com | @innjaa_seller_support
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
