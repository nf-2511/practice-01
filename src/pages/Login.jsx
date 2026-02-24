// Login.jsx — Tizimga kirish sahifasi: email va parol orqali autentifikatsiya
import { useState } from "react"; // holatni boshqarish uchun React hook
import { useNavigate } from "react-router-dom"; // sahifalar orasida dasturiy navigatsiya

// Login komponenti — foydalanuvchi tizimga kirish formasi
function Login() {
  // navigate — login muvaffaqiyatli bo'lganda dashboard ga yo'naltirish uchun
  const navigate = useNavigate();

  // Form ma'lumotlari uchun holat (state) — email va parol
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Xatolik xabarini saqlash uchun holat
  const [error, setError] = useState("");

  // Yuklanish holatini boshqarish — tugma bosilganda loading ko'rsatish
  const [loading, setLoading] = useState(false);

  // ============================================================
  // INPUT O'ZGARISHLARINI BOSHQARISH
  // Har bir input o'zgarganda formData yangilanadi
  // ============================================================
  const handleChange = (e) => {
    // name — input nomi (email yoki password), value — kiritilgan qiymat
    const { name, value } = e.target;
    // Oldingi qiymatlarni saqlab, faqat o'zgargan maydonni yangilaymiz
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ============================================================
  // FORMANI YUBORISH (SUBMIT) FUNKSIYASI
  // Email va parolni tekshirib, dashboard ga yo'naltiradi
  // ============================================================
  const handleSubmit = async (e) => {
    // Sahifa yangilanishini to'xtatamiz (default form behavior)
    e.preventDefault();
    // Xatolik xabarini tozalaymiz
    setError("");
    // Yuklanish holatini yoqamiz
    setLoading(true);

    try {
      // Backend API ga so'rov yuboramiz — foydalanuvchini email bo'yicha qidiramiz
      const response = await fetch(
        `http://localhost:3001/users?email=${formData.email}`
      );
      // Javobni JSON formatiga o'giramiz
      const users = await response.json();

      // Agar foydalanuvchi topilmasa yoki parol noto'g'ri bo'lsa
      if (users.length === 0 || users[0].password !== formData.password) {
        setError("Email yoki parol noto'g'ri!");
        setLoading(false);
        return; // funksiyani to'xtatamiz
      }

      // Muvaffaqiyatli login — foydalanuvchi ma'lumotini localStorage ga saqlaymiz
      localStorage.setItem("user", JSON.stringify(users[0]));

      // Dashboard sahifasiga yo'naltiramiz
      navigate("/");
    } catch {
      // Tarmoq xatoligi yoki server ishlamasa
      setError("Server bilan bog'lanishda xatolik yuz berdi!");
    } finally {
      // Har qanday holatda yuklanishni to'xtatamiz
      setLoading(false);
    }
  };

  return (
    // To'liq ekranli konteyner — DaisyUI base-200 fon, markazga joylashgan
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      {/* Login kartasi — base-100 fon (light: oq, dark: qora), soya */}
      <div className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* ============ SARLAVHA QISMI ============ */}
        <div className="text-center mb-8">
          {/* Loyiha logotipi */}
          <h1 className="text-3xl font-bold">
            {/* "Sedap" — primary rangda, nuqta bilan */}
            <span className="text-primary">Sedap</span>
            <span className="text-base-content">.</span>
          </h1>
          {/* Tavsif matni — 50% shaffof */}
          <p className="text-base-content/50 mt-2">Admin panelga kirish</p>
        </div>

        {/* ============ XATOLIK XABARI ============ */}
        {/* Agar xatolik bo'lsa, DaisyUI alert-error ko'rsatamiz */}
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {/* ============ LOGIN FORMASI ============ */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL MAYDONI */}
          <div>
            {/* Label — maydon nomi */}
            <label className="block text-sm font-medium text-base-content/70 mb-1">
              Email manzil
            </label>
            {/* Input — DaisyUI input-bordered komponenti */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="input input-bordered w-full"
              required // bo'sh bo'lishi mumkin emas
            />
          </div>

          {/* PAROL MAYDONI */}
          <div>
            <label className="block text-sm font-medium text-base-content/70 mb-1">
              Parol
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Parolni kiriting"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* KIRISH TUGMASI — DaisyUI btn-primary */}
          <button
            type="submit"
            disabled={loading} // yuklanish vaqtida tugma o'chiriladi
            className="btn btn-primary w-full"
          >
            {/* Yuklanish bo'lsa spinner, aks holda "Kirish" matni */}
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Kirish"
            )}
          </button>
        </form>

        {/* ============ PASTKI QISM ============ */}
        <p className="text-center text-sm text-base-content/40 mt-6">
          Sedap Restaurant Admin Dashboard
        </p>
      </div>
    </div>
  );
}

// Login komponentini eksport qilamiz
export default Login;
