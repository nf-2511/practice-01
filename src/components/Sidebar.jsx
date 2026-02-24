// Sidebar.jsx — Chap panel: navigatsiya menyu elementlari va loyiha logotipi
import { NavLink } from "react-router-dom"; // Aktiv sahifani belgilash uchun NavLink ishlatamiz

// React Icons kutubxonasidan kerakli ikonkalarni import qilamiz
import {
  IoGridOutline, // Dashboard ikonkasi
  IoListOutline, // Buyurtmalar ro'yxati ikonkasi
  IoPeopleOutline, // Mijozlar ikonkasi
  IoBarChartOutline, // Analitika ikonkasi
  IoStarOutline, // Sharhlar ikonkasi
  IoFastFoodOutline, // Taomlar ikonkasi
  IoCalendarOutline, // Kalendar ikonkasi
  IoChatbubblesOutline, // Chat ikonkasi
  IoWalletOutline, // Hamyon ikonkasi
} from "react-icons/io5";

// ============================================================
// NAVIGATSIYA ELEMENTLARI RO'YXATI
// Har bir element: nomi, URL yo'li va ikonka komponenti
// Detail sahifalar sidebardan olib tashlangan (ular ichki sahifalar)
// ============================================================
const menuItems = [
  { name: "Dashboard", path: "/", icon: IoGridOutline },
  { name: "Order List", path: "/orders", icon: IoListOutline },
  { name: "Customer", path: "/customers", icon: IoPeopleOutline },
  { name: "Analytics", path: "/analytics", icon: IoBarChartOutline },
  { name: "Reviews", path: "/reviews", icon: IoStarOutline },
  { name: "Foods", path: "/foods", icon: IoFastFoodOutline },
  { name: "Calendar", path: "/calendar", icon: IoCalendarOutline },
  { name: "Chat", path: "/chat", icon: IoChatbubblesOutline },
  { name: "Wallet", path: "/wallet", icon: IoWalletOutline },
];

// ============================================================
// SIDEBAR KOMPONENTI
// Props: isOpen — mobil qurilmalarda sidebar ochiq/yopiqligini boshqaradi
//        onClose — mobilda sidebar yopish funksiyasi
// ============================================================
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* ============ MOBIL OVERLAY ============ */}
      {/* Mobil qurilmalarda sidebar ochilganda orqa fon qoraytirish */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose} // Overlayga bosib sidebar yopish
        />
      )}

      {/* ============ SIDEBAR ASOSIY KONTEYNERI ============ */}
      {/* bg-base-100 — DaisyUI asosiy fon rangi (light/dark ga moslashadi) */}
      {/* border-base-200 — DaisyUI ikkinchi daraja chiziq rangi */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[250px] bg-base-100 border-r border-base-200
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* ============ LOGOTIP QISMI ============ */}
        <div className="p-6 pb-2">
          {/* Loyiha nomi — primary rangda "Sedap" va nuqta */}
          <h1 className="text-2xl font-bold">
            {/* text-primary — DaisyUI asosiy accent rangi */}
            <span className="text-primary">Sedap</span>
            {/* text-base-content — DaisyUI asosiy matn rangi */}
            <span className="text-base-content">.</span>
          </h1>
          {/* Loyiha tavsifi — base-content/40 — 40% shaffof matn */}
          <p className="text-xs text-base-content/40 mt-1">Modern Admin Dashboard</p>
        </div>

        {/* ============ NAVIGATSIYA MENYU ============ */}
        {/* overflow-y-auto — elementlar ko'p bo'lsa scrollbar paydo bo'ladi */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {/* menuItems massivini map qilib har bir element uchun link yaratamiz */}
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"} // Faqat "/" uchun aniq moslik (boshqa /... lar aktiv bo'lmasligi uchun)
              onClick={onClose} // Mobilda link bosilganda sidebar yopiladi
              // className funksiyasi — isActive parametri orqali aktiv holatni aniqlaymiz
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? // Aktiv holat — bg-primary (DaisyUI asosiy rang), primary-content (oq matn)
                      "bg-primary text-primary-content shadow-md shadow-primary/20"
                    : // Oddiy holat — base-content/50 matn, hover da base-200 fon
                      "text-base-content/50 hover:bg-base-200 hover:text-base-content"
                }`
              }
            >
              {/* Menyu ikonkasi — 18px kattalikda */}
              <item.icon className="text-lg" />
              {/* Menyu nomi */}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* ============ REKLAMA BANNER ============ */}
        {/* Sidebar pastki qismidagi promo karta */}
        <div className="p-4">
          {/* bg-primary/5 — primary rangning 5% shaffofligi */}
          <div className="bg-primary/5 rounded-xl p-4 text-center">
            {/* Reklama matni */}
            <p className="text-xs text-base-content/60 mb-3">
              Menyularingizni quyidagi tugma orqali tartibga soling!
            </p>
            {/* Menyu qo'shish tugmasi — DaisyUI btn-primary */}
            <button className="btn btn-primary btn-sm">
              + Menyu qo'shish
            </button>
          </div>
        </div>

        {/* ============ FOOTER ============ */}
        <div className="px-4 pb-4">
          <p className="text-[10px] text-base-content/40">
            Sedap Restaurant Admin Dashboard
          </p>
          <p className="text-[10px] text-base-content/30">
            &copy; 2024 Barcha huquqlar himoyalangan
          </p>
        </div>
      </aside>
    </>
  );
}

// Sidebar komponentini eksport qilamiz
export default Sidebar;
