// App.jsx — Asosiy layout komponenti: Sidebar + Navbar + sahifa kontenti
import { useState } from "react"; // Sidebar ochiq/yopiq holatini boshqarish uchun
import { Outlet } from "react-router-dom"; // Child route komponentlarini ko'rsatish uchun
import Navbar from "./components/Navbar"; // Yuqori panel komponenti
import Sidebar from "./components/Sidebar"; // Chap panel komponenti

// App komponenti — barcha sahifalar uchun umumiy shablon (layout)
function App() {
  // sidebarOpen — mobil qurilmalarda sidebar ochiq(true) yoki yopiq(false) holatini saqlaydi
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ============================================================
  // SIDEBAR BOSHQARUV FUNKSIYALARI
  // ============================================================

  // toggleSidebar — sidebar holatini teskari o'zgartiradi (ochiq -> yopiq, yopiq -> ochiq)
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // closeSidebar — sidebarni yopadi (mobilda link bosilganda yoki overlay bosilganda)
  const closeSidebar = () => setSidebarOpen(false);

  return (
    // Asosiy konteyner — bg-base-200 (DaisyUI ikkinchi fon rangi — kontent zonasi uchun)
    <div className="flex h-screen bg-base-200 overflow-hidden">
      {/* ============ CHAP PANEL (SIDEBAR) ============ */}
      {/* isOpen — mobilda ko'rinish holatini boshqaradi */}
      {/* onClose — sidebarni yopish funksiyasi */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* ============ ASOSIY KONTENT QISMI ============ */}
      {/* flex-1 — qolgan barcha bo'sh joyni egallaydi */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Yuqori panel — qidiruv, bildirishnomalar, profil */}
        {/* onToggleSidebar — hamburger tugma bosilganda sidebar ochiladi */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* ============ SAHIFA KONTENTI ============ */}
        {/* Outlet — React Router child route komponentini shu joyda ko'rsatadi */}
        {/* overflow-y-auto — kontent uzun bo'lsa vertikal scroll paydo bo'ladi */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// App komponentini eksport qilamiz
export default App;
