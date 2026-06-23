import { Container, Heading, Text } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import {
  DocumentText,
  ShieldCheck,
  CurrencyDollar,
  ArrowPath,
} from "@medusajs/icons"

export const Terms = () => {
  const { t } = useTranslation()

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-ui-bg-subtle to-ui-bg-base flex flex-col"
      dir="rtl"
    >
      {/* Header */}
      <div className="w-full border-b bg-ui-bg-base shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
              <Text className="text-white font-bold text-lg">D</Text>
            </div>
            <div>
              <Text size="small" weight="plus" className="text-ui-fg-base">
                Door Festival
              </Text>
              <Text size="xsmall" className="text-ui-fg-muted">
                پنل فروشندگان
              </Text>
            </div>
          </div>
          <Link
            to="/login"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            بازگشت به ورود
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-y-6 p-6 max-w-6xl mx-auto w-full">
        {/* Hero */}
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl px-8 py-16 shadow-lg text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <DocumentText className="w-10 h-10" />
            </div>
            <Heading level="h1" className="text-5xl font-bold mb-4 text-white">
              قوانین و مقررات فروشندگان
            </Heading>
            <Text className="text-xl text-violet-100 leading-relaxed max-w-3xl mx-auto">
              شرایط و قوانین فروش در پلتفرم دور فستیوال
            </Text>
            <Text className="text-sm text-violet-200 mt-4">
              آخرین بروزرسانی: خرداد ۱۴۰۴
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
              <Text weight="plus" className="text-ui-fg-base">
                کمیسیون
              </Text>
            </div>
            <Text className="text-2xl font-bold text-ui-fg-base">۱۰٪</Text>
            <Text size="xsmall" className="text-ui-fg-muted">
              از هر فروش
            </Text>
          </div>

          <div className="bg-ui-bg-base rounded-xl p-6 border border-ui-border-base hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
              <Text weight="plus" className="text-ui-fg-base">
                ارسال
              </Text>
            </div>
            <Text className="text-2xl font-bold text-ui-fg-base">۳ روز</Text>
            <Text size="xsmall" className="text-ui-fg-muted">
              حداکثر زمان آماده‌سازی
            </Text>
          </div>

          <div className="bg-ui-bg-base rounded-xl p-6 border border-ui-border-base hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <ArrowPath className="w-5 h-5 text-orange-600" />
              </div>
              <Text weight="plus" className="text-ui-fg-base">
                مرجوعی
              </Text>
            </div>
            <Text className="text-2xl font-bold text-ui-fg-base">۷ روز</Text>
            <Text size="xsmall" className="text-ui-fg-muted">
              حق مرجوعی مشتری
            </Text>
          </div>

          <div className="bg-ui-bg-base rounded-xl p-6 border border-ui-border-base hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-violet-600" />
              </div>
              <Text weight="plus" className="text-ui-fg-base">
                پرداخت
              </Text>
            </div>
            <Text className="text-2xl font-bold text-ui-fg-base">هفتگی</Text>
            <Text size="xsmall" className="text-ui-fg-muted">
              تسویه حساب
            </Text>
          </div>
        </div>

        {/* Main Content */}
        <Container className="!max-w-none">
          <div className="flex flex-col gap-y-8">
            {/* 1. About */}
            <div className="flex flex-col gap-y-4">
              <Heading
                level="h2"
                className="text-3xl font-bold text-ui-fg-base flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg text-white text-lg font-bold">
                  ۱
                </span>
                درباره دور فستیوال
              </Heading>
              <div className="bg-ui-bg-base rounded-xl p-8 border border-ui-border-base shadow-sm">
                <Text className="text-ui-fg-base leading-relaxed mb-4 text-lg">
                  دور فستیوال یک بازارگاه آنلاین کیوریت‌شده است که درِ دنیای
                  برندهای مستقل مد، طراحی و سبک زندگی را می‌گشاید. ما طراحان
                  مستعد، برندهای تثبیت‌شده و خالقان نوظهور را در یک پلتفرم گرد
                  هم می‌آوریم.
                </Text>
                <Text className="text-ui-fg-subtle leading-relaxed text-base">
                  دور فستیوال با این ایده ساده پایه‌گذاری شد: خرید باید مثل قدم
                  زدن در یک بوتیک خوش‌چین احساس شود، نه اسکرول در یک کاتالوگ
                  بی‌پایان. هر برندی که در پلتفرم ما حضور دارد با دقت بابت
                  اصالت، کیفیت و داستان پشت آن انتخاب شده است.
                </Text>
              </div>
            </div>

            {/* 2. Who Can Sell */}
            <div className="flex flex-col gap-y-4">
              <Heading
                level="h2"
                className="text-3xl font-bold text-ui-fg-base flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg text-white text-lg font-bold">
                  ۲
                </span>
                چه کسانی می‌توانند بفروشند؟
              </Heading>
              <div className="bg-ui-bg-base rounded-xl p-8 border border-ui-border-base shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: "🎨", title: "طراحان مستقل و آتلیه‌ها" },
                    { icon: "👗", title: "برندهای تثبیت‌شده مد و سبک زندگی" },
                    { icon: "🤲", title: "تولیدکنندگان دست‌ساز و تیراژ محدود" },
                    {
                      icon: "🏪",
                      title: "بوتیک‌هایی که به دنبال گسترش آنلاین هستند",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-ui-bg-subtle rounded-lg p-4 border border-ui-border-base"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <Text className="text-ui-fg-base font-medium">
                        {item.title}
                      </Text>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <Heading
                    level="h3"
                    className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100"
                  >
                    پیش‌نیازها
                  </Heading>
                  <ul className="space-y-3">
                    {[
                      "پروفایل کسب‌وکار ثبت‌شده یا طراح فردی احراز هویت‌شده",
                      "محصولات اصیل و اورجینال",
                      "توانایی تکمیل سفارش‌ها به موقع و قابل اعتماد",
                      "تعهد به استانداردهای کیفی و خدمات مشتری دور فستیوال",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-blue-800 dark:text-blue-200"
                      >
                        <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Registration */}
            <div className="flex flex-col gap-y-4">
              <Heading
                level="h2"
                className="text-3xl font-bold text-ui-fg-base flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg text-white text-lg font-bold">
                  ۳
                </span>
                فرآیند ثبت‌نام
              </Heading>
              <div className="bg-ui-bg-base rounded-xl p-8 border border-ui-border-base shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    {
                      step: "۱",
                      title: "درخواست",
                      desc: "فرم درخواست فروشندگی را در brand.doorfestival.com تکمیل کنید",
                    },
                    {
                      step: "۲",
                      title: "بررسی",
                      desc: "تیم ما درخواست را بررسی و ظرف ۳ روز کاری با شما تماس می‌گیرد",
                    },
                    {
                      step: "۳",
                      title: "راه‌اندازی",
                      desc: "پس از تأیید، در راه‌اندازی فروشگاه و آپلود محصولات همراهتان هستیم",
                    },
                    {
                      step: "۴",
                      title: "شروع فروش",
                      desc: "دسترسی به مشتریان سراسر ایران",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-ui-bg-subtle rounded-xl p-5 border border-ui-border-base"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center text-white font-bold mb-3">
                        {item.step}
                      </div>
                      <Text weight="plus" className="text-ui-fg-base mb-2">
                        {item.title}
                      </Text>
                      <Text
                        size="small"
                        className="text-ui-fg-muted leading-relaxed"
                      >
                        {item.desc}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Commission */}
            <div className="flex flex-col gap-y-4">
              <Heading
                level="h2"
                className="text-3xl font-bold text-ui-fg-base flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg text-white text-lg font-bold">
                  ۴
                </span>
                قیمت‌گذاری و کمیسیون
              </Heading>
              <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 rounded-xl p-8 border-2 border-violet-200 dark:border-violet-800 shadow-lg">
                <div className="space-y-6">
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-6">
                    <Heading
                      level="h3"
                      className="text-xl font-semibold mb-3 text-violet-900 dark:text-violet-100 flex items-center gap-2"
                    >
                      <CurrencyDollar className="w-6 h-6" />
                      کمیسیون پلتفرم
                    </Heading>
                    <Text className="text-violet-800 dark:text-violet-200 leading-relaxed mb-4">
                      دور فستیوال از هر فروش موفق کمیسیون دریافت می‌کند:
                    </Text>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-violet-200 dark:border-violet-700">
                        <Text className="text-sm text-ui-fg-muted mb-1">
                          کمیسیون پایه
                        </Text>
                        <Text className="text-3xl font-bold text-violet-600">
                          ۱۰٪
                        </Text>
                        <Text className="text-xs text-ui-fg-muted mt-1">
                          از قیمت فروش
                        </Text>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-violet-200 dark:border-violet-700">
                        <Text className="text-sm text-ui-fg-muted mb-1">
                          فروشندگان برتر
                        </Text>
                        <Text className="text-3xl font-bold text-green-600">
                          ۷٪
                        </Text>
                        <Text className="text-xs text-ui-fg-muted mt-1">
                          با شرایط خاص
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-6">
                    <Heading
                      level="h3"
                      className="text-xl font-semibold mb-3 text-violet-900 dark:text-violet-100"
                    >
                      پرداخت‌ها
                    </Heading>
                    <ul className="space-y-3">
                      {[
                        "پرداخت‌ها به صورت هفتگی انجام می‌شود",
                        "حداقل موجودی برای برداشت: ۱۰۰٬۰۰۰ تومان",
                        "پرداخت‌ها پس از تأیید تحویل محصول آزاد می‌شوند",
                        "قیمت‌گذاری محصولات بر عهده فروشنده است",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-violet-800 dark:text-violet-200"
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-violet-500 rounded-full mt-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Shipping */}
            <div className="flex flex-col gap-y-4">
              <Heading
                level="h2"
                className="text-3xl font-bold text-ui-fg-base flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg text-white text-lg font-bold">
                  ۵
                </span>
                ارسال و تحویل
              </Heading>
              <div className="bg-ui-bg-base rounded-xl p-8 border border-ui-border-base shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">📮</span>
                      <Text weight="plus" className="text-ui-fg-base text-lg">
                        پست
                      </Text>
                    </div>
                    <Text
                      size="small"
                      className="text-ui-fg-muted leading-relaxed"
                    >
                      ارسال از طریق شبکه پست جمهوری اسلامی ایران — پوشش سراسری
                    </Text>
                  </div>
                  <div className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🚚</span>
                      <Text weight="plus" className="text-ui-fg-base text-lg">
                        پستکس
                      </Text>
                    </div>
                    <Text
                      size="small"
                      className="text-ui-fg-muted leading-relaxed"
                    >
                      ارسال سریع از طریق پستکس — تحویل سریع‌تر در شهرهای اصلی
                    </Text>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "آماده‌سازی و ارسال سفارش حداکثر ظرف ۳ روز کاری پس از ثبت",
                    "بارگذاری کد رهگیری در پنل پس از ارسال الزامی است",
                    "بسته‌بندی محصول باید با استانداردهای کیفی دور فستیوال مطابقت داشته باشد",
                    "در صورت تأخیر، اطلاع‌رسانی به تیم پشتیبانی ضروری است",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-ui-fg-subtle"
                    >
                      <span className="flex-shrink-0 w-2 h-2 bg-violet-500 rounded-full mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. Returns */}
            <div className="flex flex-col gap-y-4">
              <Heading
                level="h2"
                className="text-3xl font-bold text-ui-fg-base flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg text-white text-lg font-bold">
                  ۶
                </span>
                مرجوعی و تعویض
              </Heading>
              <div className="bg-ui-bg-base rounded-xl p-8 border border-ui-border-base shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: "✅", text: "مرجوعی یا تعویض ظرف ۷ روز از تحویل" },
                    {
                      icon: "✅",
                      text: "کالا باید دست‌نخورده و در بسته‌بندی اصلی با برچسب باشد",
                    },
                    {
                      icon: "✅",
                      text: "ارائه شماره سفارش یا فاکتور الزامی است",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <Text
                        size="small"
                        className="text-green-800 dark:text-green-200 leading-relaxed"
                      >
                        {item.text}
                      </Text>
                    </div>
                  ))}
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-5">
                  <Text
                    weight="plus"
                    className="text-orange-900 dark:text-orange-100 mb-2"
                  >
                    استثناها
                  </Text>
                  <Text
                    size="small"
                    className="text-orange-800 dark:text-orange-200 leading-relaxed"
                  >
                    محصولات فروش نهایی، لباس‌های زیر، سفارشی‌سازی‌شده و برخی
                    اقلام بهداشتی قابل مرجوع نیستند.
                  </Text>
                </div>
              </div>
            </div>

            {/* 7. Prohibited */}
            <div className="flex flex-col gap-y-4">
              <Heading
                level="h2"
                className="text-3xl font-bold text-ui-fg-base flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg text-white text-lg font-bold">
                  ⚠
                </span>
                فعالیت‌های ممنوع
              </Heading>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl p-8 border-2 border-red-200 dark:border-red-800 shadow-lg">
                <Text className="text-red-800 dark:text-red-200 font-semibold mb-4 text-lg">
                  فعالیت‌های زیر ممنوع بوده و منجر به تعلیق یا حذف دائمی حساب
                  می‌شود:
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "فروش محصولات جعلی، تقلبی یا غیرقانونی",
                    "دستکاری نظرات یا امتیازات مشتریان",
                    "ایجاد چندین حساب برای سوءاستفاده",
                    "ارائه اطلاعات نادرست درباره محصولات",
                    "رفتار غیرحرفه‌ای یا توهین‌آمیز با مشتریان",
                    "نقض حقوق مالکیت فکری دیگران",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-red-200 dark:border-red-700 flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        ✕
                      </span>
                      <Text className="text-red-700 dark:text-red-300">
                        {item}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 8. Why Sell */}
            <div className="flex flex-col gap-y-4">
              <Heading
                level="h2"
                className="text-3xl font-bold text-ui-fg-base flex items-center gap-3"
              >
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg text-white text-lg font-bold">
                  ۸
                </span>
                چرا در دور فستیوال بفروشید؟
              </Heading>
              <div className="bg-ui-bg-base rounded-xl p-8 border border-ui-border-base shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🎯",
                      title: "دسترسی به مخاطب هدفمند",
                      desc: "مشتریانی که کیفیت و طراحی برایشان اهمیت دارد",
                    },
                    {
                      icon: "🏷️",
                      title: "هویت برند خودتان",
                      desc: "فروشگاه، داستان و هویت خودتان — نه ما",
                    },
                    {
                      icon: "📊",
                      title: "ابزارهای رشد",
                      desc: "داشبورد ساده برای مدیریت محصولات، سفارش‌ها و موجودی",
                    },
                    {
                      icon: "📢",
                      title: "معرفی بازاریابی",
                      desc: "جایگاه‌های ویژه، کمپین‌های فصلی و اسپات‌های شبکه‌های اجتماعی",
                    },
                    {
                      icon: "🤝",
                      title: "پشتیبانی اختصاصی",
                      desc: "تیم واقعی پشت هر سوال شما",
                    },
                    {
                      icon: "🔒",
                      title: "پرداخت امن",
                      desc: "تسویه هفتگی شفاف و قابل اعتماد",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-ui-bg-subtle rounded-lg p-4 border border-ui-border-base"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <Text weight="plus" className="text-ui-fg-base mb-1">
                          {item.title}
                        </Text>
                        <Text size="small" className="text-ui-fg-muted">
                          {item.desc}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl px-8 py-12 shadow-xl text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <Heading level="h2" className="text-3xl font-bold mb-3 text-white">
              سوالی دارید؟
            </Heading>
            <Text className="text-violet-100 mb-6 text-lg">
              تیم دور فستیوال آماده پاسخگویی به سوالات شماست
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@doorfestival.com"
                className="inline-flex items-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold hover:bg-violet-50 transition-colors shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                ارسال ایمیل
              </a>
              <a
                href="https://brand.doorfestival.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                ثبت‌نام فروشندگی
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                ورود به پنل
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
            <Text className="text-violet-200 mt-6 text-sm">
              info@doorfestival.com | ۰۹۳۹ ۳۷۷ ۵۱۷۵ | brand.doorfestival.com
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
