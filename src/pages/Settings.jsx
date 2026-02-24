import { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { toast } from "react-toastify";
import {
  IoPersonOutline,
  IoRestaurantOutline,
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoSaveOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

const API_URL = "http://localhost:3001";

const tabs = [
  { id: "profile", label: "Profil", icon: IoPersonOutline },
  { id: "restaurant", label: "Restoran", icon: IoRestaurantOutline },
  { id: "notifications", label: "Bildirishnomalar", icon: IoNotificationsOutline },
  { id: "security", label: "Xavfsizlik", icon: IoShieldCheckmarkOutline },
];

const weekDays = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
  "Yakshanba",
];

// ============================================================
// PROFIL TAB
// ============================================================
function ProfileTab() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    setUser({
      name: stored.name || "",
      email: stored.email || "",
      contactNumber: stored.contactNumber || "",
      address: stored.address || "",
      bio: stored.bio || "",
      profilePicture: stored.profilePicture || "",
    });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch(`${API_URL}/users/${stored.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Xatolik");
      const updated = await res.json();
      localStorage.setItem("user", JSON.stringify(updated));
      toast.success("Profil muvaffaqiyatli yangilandi!");
    } catch {
      toast.error("Profilni yangilashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <span className="loading loading-spinner loading-md" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="avatar">
          <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user.profilePicture || "https://via.placeholder.com/80"}
              alt="avatar"
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{user.name || "Foydalanuvchi"}</h3>
          <p className="text-sm text-base-content/50">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Ism</span></label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Ismingiz"
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Email"
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Telefon</span></label>
          <input
            type="text"
            name="contactNumber"
            value={user.contactNumber}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="+998..."
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Manzil</span></label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Manzil"
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text">Bio</span></label>
        <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
          placeholder="O'zingiz haqingizda..."
        />
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text">Avatar URL</span></label>
        <input
          type="text"
          name="profilePicture"
          value={user.profilePicture}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="https://..."
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <IoSaveOutline className="text-lg" />
        )}
        Saqlash
      </button>
    </div>
  );
}

// ============================================================
// RESTORAN TAB
// ============================================================
function RestaurantTab() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("restaurantSettings");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Sedap Restaurant",
          address: "Toshkent sh., Chilonzor tumani",
          phone: "+998712345678",
          openTime: "09:00",
          closeTime: "23:00",
          workDays: {
            Dushanba: true,
            Seshanba: true,
            Chorshanba: true,
            Payshanba: true,
            Juma: true,
            Shanba: true,
            Yakshanba: false,
          },
        };
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const toggleDay = (day) => {
    setSettings({
      ...settings,
      workDays: { ...settings.workDays, [day]: !settings.workDays[day] },
    });
  };

  const handleSave = () => {
    localStorage.setItem("restaurantSettings", JSON.stringify(settings));
    toast.success("Restoran sozlamalari saqlandi!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Restoran nomi</span></label>
          <input
            type="text"
            name="name"
            value={settings.name}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Telefon</span></label>
          <input
            type="text"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text">Manzil</span></label>
        <input
          type="text"
          name="address"
          value={settings.address}
          onChange={handleChange}
          className="input input-bordered"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Ochilish vaqti</span></label>
          <input
            type="time"
            name="openTime"
            value={settings.openTime}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Yopilish vaqti</span></label>
          <input
            type="time"
            name="closeTime"
            value={settings.closeTime}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
      </div>

      <div>
        <label className="label"><span className="label-text">Ish kunlari</span></label>
        <div className="flex flex-wrap gap-2">
          {weekDays.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`btn btn-sm ${
                settings.workDays[day] ? "btn-primary" : "btn-ghost border-base-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        <IoSaveOutline className="text-lg" />
        Saqlash
      </button>
    </div>
  );
}

// ============================================================
// BILDIRISHNOMALAR TAB
// ============================================================
function NotificationsTab() {
  const [notifSettings, setNotifSettings] = useState(() => {
    const saved = localStorage.getItem("notificationSettings");
    return saved
      ? JSON.parse(saved)
      : {
          email: true,
          push: true,
          orders: true,
          reviews: false,
          system: true,
          marketing: false,
        };
  });

  const toggleSetting = (key) => {
    const updated = { ...notifSettings, [key]: !notifSettings[key] };
    setNotifSettings(updated);
    localStorage.setItem("notificationSettings", JSON.stringify(updated));
    toast.success("Bildirishnoma sozlamalari yangilandi!");
  };

  const notifOptions = [
    {
      key: "email",
      label: "Email bildirishnomalar",
      desc: "Muhim yangiliklar email orqali yuborilsin",
    },
    {
      key: "push",
      label: "Push bildirishnomalar",
      desc: "Brauzer push bildirishnomalarini yoqish",
    },
    {
      key: "orders",
      label: "Buyurtma bildirishnomalari",
      desc: "Yangi buyurtmalar haqida xabar olish",
    },
    {
      key: "reviews",
      label: "Sharh bildirishnomalari",
      desc: "Yangi sharhlar haqida xabar olish",
    },
    {
      key: "system",
      label: "Tizim bildirishnomalari",
      desc: "Tizim yangilanishlari haqida xabar",
    },
    {
      key: "marketing",
      label: "Marketing bildirishnomalari",
      desc: "Aksiya va takliflar haqida xabar olish",
    },
  ];

  return (
    <div className="space-y-4">
      {notifOptions.map((opt) => (
        <div
          key={opt.key}
          className="flex items-center justify-between p-4 bg-base-100 rounded-lg border border-base-200"
        >
          <div>
            <p className="font-medium text-base-content">{opt.label}</p>
            <p className="text-sm text-base-content/50">{opt.desc}</p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={notifSettings[opt.key]}
            onChange={() => toggleSetting(opt.key)}
          />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// XAVFSIZLIK TAB
// ============================================================
function SecurityTab() {
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [twoFA, setTwoFA] = useState(() => {
    return localStorage.getItem("twoFA") === "true";
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShowPass({ ...showPass, [field]: !showPass[field] });
  };

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      toast.error("Yangi parollar mos kelmaydi!");
      return;
    }
    if (passwords.newPass.length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      if (passwords.current !== stored.password) {
        toast.error("Joriy parol noto'g'ri!");
        return;
      }
      const res = await fetch(`${API_URL}/users/${stored.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwords.newPass }),
      });
      if (!res.ok) throw new Error("Xatolik");
      const updated = await res.json();
      localStorage.setItem("user", JSON.stringify(updated));
      setPasswords({ current: "", newPass: "", confirm: "" });
      toast.success("Parol muvaffaqiyatli o'zgartirildi!");
    } catch {
      toast.error("Parolni o'zgartirishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const toggle2FA = () => {
    const newValue = !twoFA;
    setTwoFA(newValue);
    localStorage.setItem("twoFA", String(newValue));
    toast.success(
      newValue ? "2FA yoqildi!" : "2FA o'chirildi!"
    );
  };

  const renderPasswordField = (name, label, placeholder) => (
    <div className="form-control">
      <label className="label"><span className="label-text">{label}</span></label>
      <div className="relative">
        <input
          type={showPass[name] ? "text" : "password"}
          name={name}
          value={passwords[name]}
          onChange={handleChange}
          className="input input-bordered w-full pr-10"
          placeholder={placeholder}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
          onClick={() => toggleShow(name)}
        >
          {showPass[name] ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Parolni o'zgartirish</h3>
        <div className="space-y-4 max-w-md">
          {renderPasswordField("current", "Joriy parol", "Joriy parolingiz")}
          {renderPasswordField("newPass", "Yangi parol", "Yangi parol")}
          {renderPasswordField("confirm", "Parolni tasdiqlash", "Yangi parolni qayta kiriting")}
          <button
            className="btn btn-primary"
            onClick={handlePasswordChange}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <IoSaveOutline className="text-lg" />
            )}
            Parolni o'zgartirish
          </button>
        </div>
      </div>

      <div className="divider" />

      <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg border border-base-200 max-w-md">
        <div>
          <p className="font-medium">Ikki bosqichli autentifikatsiya (2FA)</p>
          <p className="text-sm text-base-content/50">
            Hisobingiz xavfsizligini oshiring
          </p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={twoFA}
          onChange={toggle2FA}
        />
      </div>
    </div>
  );
}

// ============================================================
// SETTINGS ASOSIY KOMPONENT
// ============================================================
const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "restaurant":
        return <RestaurantTab />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Sozlamalar" description="Tizim sozlamalarini boshqarish" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab navigatsiya */}
        <div className="lg:w-60 shrink-0">
          <div className="bg-base-100 rounded-xl border border-base-200 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content/60 hover:bg-base-200"
                }`}
              >
                <tab.icon className="text-lg" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab kontent */}
        <div className="flex-1 bg-base-100 rounded-xl border border-base-200 p-6">
          {renderContent()}
        </div>
      </div>
    </PageContainer>
  );
};

export default Settings;
