// PrivateRoute.jsx — Himoyalangan route: faqat tizimga kirgan foydalanuvchilarga ruxsat beradi
import { Navigate, Outlet } from "react-router-dom"; // Navigate — yo'naltirish, Outlet — child routelarni ko'rsatish

// ============================================================
// PRIVATE ROUTE KOMPONENTI
// localStorage da "user" kaliti bor-yo'qligini tekshiradi
// Agar user yo'q bo'lsa — /login sahifasiga yo'naltiradi
// Agar user bor bo'lsa — child komponentlarni ko'rsatadi (Outlet)
// ============================================================
function PrivateRoute() {
  // localStorage dan "user" ma'lumotini olamiz
  const user = localStorage.getItem("user");

  // Agar user mavjud bo'lsa — Outlet orqali child routelarni renderlaymiz
  // Agar user yo'q bo'lsa — /login ga Navigate qilamiz
  // replace={true} — browser tarixida joriy sahifani almashtiramiz (orqaga bosilganda qaytmaydi)
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

// Komponentni eksport qilamiz
export default PrivateRoute;
