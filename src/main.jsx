// main.jsx — Ilovaning kirish nuqtasi: React Router sozlanadi va DOM ga renderlanadi
import { StrictMode } from "react"; // StrictMode — ishlab chiqish vaqtida xatolarni aniqlash uchun
import { createRoot } from "react-dom/client"; // React 18+ da DOM ga renderqilish uchun
import "./index.css"; // Global CSS stillar (Tailwind va DaisyUI)

// ============================================================
// REACT-TOASTIFY — bildirishnoma (toast) kutubxonasi
// ToastContainer — barcha toastlar shu komponent orqali ko'rsatiladi
// ============================================================
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS stillari

// ============================================================
// LAYOUT VA SAHIFALAR IMPORTLARI
// ============================================================
import App from "./App.jsx"; // Asosiy layout komponenti (Navbar + Sidebar + Outlet)
import Dashboard from "./pages/Dashboard.jsx"; // Dashboard — bosh sahifa
import Login from "./pages/Login.jsx"; // Login — tizimga kirish
import NotFound from "./pages/NotFound.jsx"; // 404 — noto'g'ri URL uchun
import ErrorBoundary from "./pages/ErrorBoundary.jsx"; // Xatolik sahifasi
import PrivateRoute from "./components/PrivateRoute.jsx"; // Himoyalangan route

// ============================================================
// SIDEBAR SAHIFALARI — har biri alohida route
// ============================================================
import OrderList from "./pages/OrderList.jsx"; // Buyurtmalar ro'yxati
import OrderDetail from "./pages/OrderDetail.jsx"; // Buyurtma tafsiloti
import Customer from "./pages/Customer.jsx"; // Mijozlar
import Analytics from "./pages/Analytics.jsx"; // Analitika
import Reviews from "./pages/Reviews.jsx"; // Sharhlar
import Foods from "./pages/Foods.jsx"; // Taomlar
import FoodDetail from "./pages/FoodDetail.jsx"; // Taom tafsiloti
import CustomerDetail from "./pages/CustomerDetail.jsx"; // Mijoz tafsiloti
import Calendar from "./pages/Calendar.jsx"; // Kalendar
import Chat from "./pages/Chat.jsx"; // Chat
import Wallet from "./pages/Wallet.jsx"; // Hamyon
import Settings from "./pages/Settings.jsx"; // Sozlamalar

// createBrowserRouter — zamonaviy usulda routelarni yaratish funksiyasi
// RouterProvider — routerni ilovaga ulash uchun komponent
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ============================================================
// ROUTER KONFIGURATSIYASI
// createBrowserRouter orqali barcha yo'nalishlar (routes) aniqlanadi
// ============================================================
const router = createBrowserRouter([
  {
    // Himoyalangan route — localStorage da "user" bor-yo'qligini tekshiradi
    // Agar user yo'q bo'lsa — /login ga yo'naltiradi
    path: "/",
    element: <PrivateRoute />,
    // errorElement — agar shu route yoki bolalari xatolik bersa, ErrorBoundary ko'rsatiladi
    errorElement: <ErrorBoundary />,
    // children — PrivateRoute dan o'tgandan keyin App layout ko'rsatiladi
    children: [
      {
        // App — asosiy layout (Navbar + Sidebar + Outlet)
        element: <App />,
        children: [
          // index: true — "/" yo'liga kirganda Dashboard sahifasi
          { index: true, element: <Dashboard /> },
          // Buyurtmalar bo'limi
          { path: "orders", element: <OrderList /> },
          { path: "orders/detail", element: <OrderDetail /> },
          // Mijozlar bo'limi
          { path: "customers", element: <Customer /> },
          { path: "customers/detail", element: <CustomerDetail /> },
          // Analitika va sharhlar
          { path: "analytics", element: <Analytics /> },
          { path: "reviews", element: <Reviews /> },
          // Taomlar bo'limi
          { path: "foods", element: <Foods /> },
          { path: "foods/detail", element: <FoodDetail /> },
          // Qo'shimcha sahifalar
          { path: "calendar", element: <Calendar /> },
          { path: "chat", element: <Chat /> },
          { path: "wallet", element: <Wallet /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
  {
    // Login sahifasi — ochiq route (PrivateRoute bilan himoyalanmagan)
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    // Catch-all route — yuqoridagi hech biriga mos kelmagan barcha URL lar
    path: "*",
    element: <NotFound />,
  },
]);

// ============================================================
// ILOVANI DOM GA RENDER QILISH
// ============================================================
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* RouterProvider — router konfiguratsiyasini ilovaga uzatadi */}
    <RouterProvider router={router} />

    {/* ToastContainer — react-toastify bildirishnomalarini ko'rsatish joyi */}
    {/* position: o'ng yuqori burchak, autoClose: 3 soniyadan keyin yopiladi */}
    {/* theme: DaisyUI tema bilan sinxronlashadi (light/dark/colored) */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </StrictMode>
);
