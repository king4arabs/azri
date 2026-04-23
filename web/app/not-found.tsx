import { defaultLocale } from "./lib/locale";

export default function NotFound() {
  return (
    <html lang={defaultLocale} dir={defaultLocale === "ar" ? "rtl" : "ltr"}>
      <body>
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold">404</h1>
            <p className="mt-4 text-gray-600">
              {defaultLocale === "ar"
                ? "الصفحة المطلوبة غير موجودة."
                : "The page you requested was not found."}
            </p>
            <a
              href={`/${defaultLocale}`}
              className="mt-6 inline-block text-[var(--azri-accent)] hover:underline"
            >
              {defaultLocale === "ar" ? "العودة إلى الرئيسية" : "Back to home"}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
