// ErrorBoundary.jsx — Xatolik sahifasi: ilovada kutilmagan xatolik yuz berganda ko'rsatiladi
import { useRouteError, Link } from "react-router-dom"; // xatolik ma'lumotini olish va navigatsiya uchun

// ErrorBoundary komponenti — React Router xatoliklarini ushlaydi
function ErrorBoundary() {
  // useRouteError() — routerda yuz bergan xatolikni olish uchun hook
  const error = useRouteError();

  return (
    // Sahifani markazga joylash — DaisyUI base-200 fon
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      {/* Xatolik belgisi */}
      <div className="text-6xl mb-4">&#9888;</div>

      {/* Xatolik sarlavhasi — DaisyUI error rangi */}
      <h1 className="text-3xl font-bold text-error">Xatolik yuz berdi!</h1>

      {/* Xatolik xabarini ko'rsatamiz — agar xatolik matni bo'lsa */}
      <p className="text-base-content/50 mt-3 text-center max-w-md">
        {/* Xatolik statusText yoki message ni ko'rsatamiz */}
        {error?.statusText || error?.message || "Noma'lum xatolik yuz berdi"}
      </p>

      {/* Bosh sahifaga qaytish tugmasi — DaisyUI btn-primary */}
      <Link to="/" className="btn btn-primary mt-6">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}

// Komponentni eksport qilamiz
export default ErrorBoundary;
