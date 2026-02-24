// NotFound.jsx — 404 sahifa: foydalanuvchi noto'g'ri URL kiritganda ko'rsatiladi
import { Link } from "react-router-dom"; // sahifalar orasida navigatsiya qilish uchun Link komponentini chaqiramiz

// NotFound komponenti — mavjud bo'lmagan sahifaga kirilganda ishlaydi
function NotFound() {
  return (
    // Sahifani markazga joylash uchun flexbox — DaisyUI base-200 fon
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      {/* Katta 404 raqamini ko'rsatamiz — primary rang */}
      <h1 className="text-9xl font-bold text-primary">404</h1>

      {/* Xato xabarini ko'rsatamiz — asosiy matn rangi */}
      <h2 className="text-2xl font-semibold text-base-content mt-4">
        Sahifa topilmadi
      </h2>

      {/* Qo'shimcha tushuntirish matni — 50% shaffof */}
      <p className="text-base-content/50 mt-2 text-center max-w-md">
        Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
      </p>

      {/* Bosh sahifaga qaytish tugmasi — DaisyUI btn-primary */}
      <Link to="/" className="btn btn-primary mt-6">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}

// Komponentni eksport qilamiz boshqa fayllarda ishlatish uchun
export default NotFound;
