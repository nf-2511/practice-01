// Navbar.jsx — Yuqori panel: qidiruv, bildirishnomalar, xabarlar, tema va profil
// Real project funksionalligi: API dan ma'lumot olish, dropdown menyu, logout, search
import { useEffect, useState, useRef } from "react"; // React hooklar
import { useNavigate } from "react-router-dom"; // Sahifalar orasida navigatsiya
import { toast } from "react-toastify"; // Bildirishnoma ko'rsatish uchun
import {
  IoSearchOutline, // Qidiruv ikonkasi
  IoNotificationsOutline, // Bildirishnoma ikonkasi
  IoMailOutline, // Xabar ikonkasi
  IoSettingsOutline, // Sozlamalar ikonkasi
  IoMenuOutline, // Hamburger menyu ikonkasi
  IoSunnyOutline, // Quyosh — light theme
  IoMoonOutline, // Oy — dark theme
  IoLogOutOutline, // Chiqish ikonkasi
  IoPersonOutline, // Profil ikonkasi
  IoCheckmarkDoneOutline, // Barchasini o'qilgan deb belgilash
} from "react-icons/io5";

// ============================================================
// API BASE URL — backend server manzili
// ============================================================
const API_URL = "http://localhost:3001";

// ============================================================
// NAVBAR KOMPONENTI
// Props: onToggleSidebar — mobilda sidebar ochish/yopish funksiyasi
// ============================================================
const Navbar = ({ onToggleSidebar }) => {
  // navigate — sahifalar orasida yo'naltirish uchun
  const navigate = useNavigate();

  // ============================================================
  // STATE (HOLATLAR)
  // ============================================================
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  // localStorage dan foydalanuvchi ma'lumotlarini olamiz
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [notifications, setNotifications] = useState([]); // Bildirishnomalar ro'yxati
  const [messages, setMessages] = useState([]); // Xabarlar ro'yxati
  const [searchQuery, setSearchQuery] = useState(""); // Qidiruv so'zi
  const [searchFocused, setSearchFocused] = useState(false); // Qidiruv fokuslanganda

  // Dropdown ochiq/yopiq holatlari — faqat bittasi ochiq bo'lishi kerak
  const [openDropdown, setOpenDropdown] = useState(null); // "notifications" | "messages" | "profile" | null

  // useRef — dropdown tashqarisiga bosilganda yopish uchun
  const dropdownRef = useRef(null);

  // ============================================================
  // TEMA BOSHQARUVI
  // ============================================================
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.info(`${newTheme === "dark" ? "Qorong'u" : "Yorug'"} tema yoqildi`);
  };

  // ============================================================
  // API DAN MA'LUMOTLARNI YUKLASH
  // Komponent birinchi marta renderlanda notifications va messages yuklanadi
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel ravishda 2 ta API so'rov yuboramiz — tezlik uchun
        const [notifRes, msgRes] = await Promise.all([
          fetch(`${API_URL}/notifications`),
          fetch(`${API_URL}/messages`),
        ]);
        // JSON formatiga o'giramiz
        const [notifData, msgData] = await Promise.all([
          notifRes.json(),
          msgRes.json(),
        ]);
        setNotifications(notifData);
        setMessages(msgData);
      } catch {
        // Server ishlamasa xatolik ko'rsatamiz
        toast.error("Server bilan bog'lanishda xatolik!");
      }
    };
    fetchData();
  }, []); // Faqat birinchi renderda ishlaydi

  // ============================================================
  // DROPDOWN TASHQARISIGA BOSILGANDA YOPISH
  // ============================================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Agar bosilgan joy dropdown ichida bo'lmasa — yopamiz
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup — komponent o'chirilganda listenerni olib tashlaymiz
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ============================================================
  // DROPDOWN OCHISH/YOPISH
  // Bir xil dropdown bosilsa yopiladi, boshqasi bosilsa almashadi
  // ============================================================
  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // ============================================================
  // BILDIRISHNOMANI O'QILGAN DEB BELGILASH
  // API ga PATCH so'rov yuborib, isRead ni true qilamiz
  // ============================================================
  const markNotificationRead = async (id) => {
    try {
      await fetch(`${API_URL}/notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      // Lokal holatni yangilaymiz — qayta API chaqirmasdan
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      toast.error("Bildirishnomani yangilashda xatolik!");
    }
  };

  // ============================================================
  // BARCHA BILDIRISHNOMALARNI O'QILGAN DEB BELGILASH
  // ============================================================
  const markAllNotificationsRead = async () => {
    try {
      // O'qilmagan bildirishnomalarni filter qilamiz
      const unread = notifications.filter((n) => !n.isRead);
      // Har birini PATCH qilamiz
      await Promise.all(
        unread.map((n) =>
          fetch(`${API_URL}/notifications/${n.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isRead: true }),
          })
        )
      );
      // Lokal holatni yangilaymiz
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("Barcha bildirishnomalar o'qildi");
    } catch {
      toast.error("Xatolik yuz berdi!");
    }
  };

  // ============================================================
  // XABARNI O'QILGAN DEB BELGILASH
  // ============================================================
  const markMessageRead = async (id) => {
    try {
      await fetch(`${API_URL}/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
      );
    } catch {
      toast.error("Xabarni yangilashda xatolik!");
    }
  };

  // ============================================================
  // TIZIMDAN CHIQISH (LOGOUT)
  // localStorage ni tozalab, login sahifasiga yo'naltiramiz
  // ============================================================
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.info("Tizimdan chiqdingiz");
    navigate("/login");
  };

  // ============================================================
  // QIDIRUV — Enter bosilganda ishlaydi
  // ============================================================
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      toast.info(`"${searchQuery}" qidirilmoqda...`);
      setSearchQuery("");
    }
  };

  // ============================================================
  // HISOB-KITOBLAR
  // ============================================================
  const unreadNotifications = notifications.filter((n) => !n.isRead).length;
  const unreadMessages = messages.filter((m) => !m.isRead).length;

  return (
    <header className="bg-base-100 border-b border-base-200 gap-5 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* ============ CHAP TOMON — HAMBURGER VA QIDIRUV ============ */}
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger tugma — faqat mobilda */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden btn btn-ghost btn-sm btn-square"
        >
          <IoMenuOutline className="text-xl" />
        </button>

        {/* Qidiruv maydoni */}
        <div className="relative flex-1 w-full">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`input input-bordered input-sm pl-9 flex-1 min-w-48 w-full bg-base-200 border-base-300 focus:outline-none transition-all duration-200 ${
              searchFocused ? "border-primary sm:w-full" : ""
            }`}
          />
        </div>
      </div>

      {/* ============ O'NG TOMON ============ */}
      <div className="flex items-center gap-1" ref={dropdownRef}>
        {/* ====== BILDIRISHNOMALAR ====== */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("notifications")}
            className="btn btn-ghost btn-sm btn-circle relative"
          >
            <IoNotificationsOutline className="text-lg text-base-content/70" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Bildirishnomalar dropdown */}
          {openDropdown === "notifications" && (
            <div className="absolute right-0 top-12 w-80 bg-base-100 border border-base-200 rounded-xl shadow-xl z-50">
              {/* Sarlavha */}
              <div className="flex items-center justify-between p-3 border-b border-base-200">
                <h3 className="font-semibold text-base-content text-sm">
                  Bildirishnomalar ({unreadNotifications})
                </h3>
                {unreadNotifications > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="btn btn-ghost btn-xs"
                    title="Barchasini o'qilgan deb belgilash"
                  >
                    <IoCheckmarkDoneOutline className="text-primary" />
                  </button>
                )}
              </div>
              {/* Ro'yxat */}
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-base-content/40 text-sm">
                    Bildirishnomalar yo'q
                  </p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 border-b border-base-200 cursor-pointer hover:bg-base-200 transition-colors ${
                        !notif.isRead ? "bg-primary/5" : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-base-content">
                        {notif.title}
                      </p>
                      <p className="text-xs text-base-content/50 mt-1">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ====== XABARLAR ====== */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("messages")}
            className="btn btn-ghost btn-sm btn-circle relative"
          >
            <IoMailOutline className="text-lg text-base-content/70" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadMessages}
              </span>
            )}
          </button>

          {/* Xabarlar dropdown */}
          {openDropdown === "messages" && (
            <div className="absolute right-0 top-12 w-80 bg-base-100 border border-base-200 rounded-xl shadow-xl z-50">
              <div className="p-3 border-b border-base-200">
                <h3 className="font-semibold text-base-content text-sm">
                  Xabarlar ({unreadMessages})
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="p-4 text-center text-base-content/40 text-sm">
                    Xabarlar yo'q
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => markMessageRead(msg.id)}
                      className={`p-3 border-b border-base-200 cursor-pointer hover:bg-base-200 transition-colors flex items-start gap-3 ${
                        !msg.isRead ? "bg-primary/5" : ""
                      }`}
                    >
                      {/* Yuboruvchi avatari */}
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={msg.senderAvatar} alt={msg.senderName} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-base-content">
                          {msg.senderName}
                        </p>
                        <p className="text-xs text-base-content/50 truncate">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Chat sahifasiga o'tish */}
              <div className="p-2 border-t border-base-200">
                <button
                  onClick={() => {
                    navigate("/chat");
                    setOpenDropdown(null);
                  }}
                  className="btn btn-primary btn-sm w-full"
                >
                  Barcha xabarlar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ====== SOZLAMALAR ====== */}
        <button
          onClick={() => navigate("/settings")}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <IoSettingsOutline className="text-lg text-base-content/70" />
        </button>

        {/* ====== TEMA ALMASHTIRUV ====== */}
        <label className="btn btn-ghost btn-sm btn-circle swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <IoSunnyOutline className="swap-off text-lg text-base-content/70" />
          <IoMoonOutline className="swap-on text-lg text-base-content/70" />
        </label>

        {/* Ajratuvchi chiziq */}
        <div className="w-px h-8 bg-base-300 mx-2" />

        {/* ====== PROFIL DROPDOWN ====== */}
        <div className="relative">
          <div
            onClick={() => toggleDropdown("profile")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-sm text-base-content/60 hidden sm:block">
              Hello,{" "}
              <span className="font-semibold text-base-content">
                {user.name || "Admin"}
              </span>
            </span>
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                <img
                  src={user.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || "admin"}`}
                  alt="Profil rasmi"
                />
              </div>
            </div>
          </div>

          {/* Profil dropdown */}
          {openDropdown === "profile" && (
            <div className="absolute right-0 top-14 w-56 bg-base-100 border border-base-200 rounded-xl shadow-xl z-50">
              {/* Foydalanuvchi ma'lumotlari — localStorage dan */}
              <div className="p-3 border-b border-base-200">
                <p className="font-semibold text-base-content text-sm">
                  {user.name || "Foydalanuvchi"}
                </p>
                <p className="text-xs text-base-content/50">
                  {user.email || "—"}
                </p>
                {user.role && (
                  <span className="badge badge-primary badge-xs mt-1">
                    {user.role}
                  </span>
                )}
              </div>
              {/* Menyu elementlari */}
              <div className="p-1">
                <button
                  onClick={() => {
                    navigate("/customers/detail");
                    setOpenDropdown(null);
                  }}
                  className="btn btn-ghost btn-sm w-full justify-start gap-2"
                >
                  <IoPersonOutline className="text-base" />
                  Profilim
                </button>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setOpenDropdown(null);
                  }}
                  className="btn btn-ghost btn-sm w-full justify-start gap-2"
                >
                  <IoSettingsOutline className="text-base" />
                  Sozlamalar
                </button>
                <div className="divider my-0" />
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm w-full justify-start gap-2 text-error"
                >
                  <IoLogOutOutline className="text-base" />
                  Chiqish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
