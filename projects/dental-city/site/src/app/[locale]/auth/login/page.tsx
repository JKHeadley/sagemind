import Image from "next/image";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import AuthForm from "@/components/AuthForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale) ? rawLocale : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 pt-28 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Dental City Costa Rica"
            width={64}
            height={47}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-navy">{dict.auth.loginTitle}</h1>
          <p className="text-text-light text-sm mt-1">{dict.auth.loginSubtitle}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <AuthForm mode="login" locale={locale} dict={dict} />
        </div>
      </div>
    </div>
  );
}
