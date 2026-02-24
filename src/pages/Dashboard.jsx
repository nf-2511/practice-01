// Dashboard.jsx — Bosh sahifa: admin panelining asosiy ko'rinishi
import PageTitle from "../components/PageTitle"; // Sahifa sarlavhasi komponenti
import PageContainer from "../components/PageContainer"; // Sahifa konteyneri komponenti
import {
  IoRestaurantOutline, // Restoran ikonkasi
  IoPeopleOutline, // Mijozlar ikonkasi
  IoCartOutline, // Buyurtmalar ikonkasi
  IoCashOutline, // Daromad ikonkasi
} from "react-icons/io5";

// ============================================================
// STATISTIKA KARTALARI MA'LUMOTLARI
// Har bir karta: sarlavha, qiymat, o'sish foizi, rang va ikonka
// DaisyUI semantic ranglar ishlatilgan (primary, secondary, accent, warning)
// ============================================================
const statsCards = [
  {
    id: 1,
    title: "Jami buyurtmalar",
    value: "1,247",
    change: "+12.5%",
    isPositive: true, // o'sish success rangda ko'rsatiladi
    icon: IoCartOutline,
    bgColor: "bg-primary/10", // primary rangning 10% shaffofligi
    iconColor: "text-primary", // DaisyUI primary rang
  },
  {
    id: 2,
    title: "Jami daromad",
    value: "$45,678",
    change: "+8.2%",
    isPositive: true,
    icon: IoCashOutline,
    bgColor: "bg-info/10", // info rangning 10% shaffofligi
    iconColor: "text-info", // DaisyUI info rang
  },
  {
    id: 3,
    title: "Jami mijozlar",
    value: "3,842",
    change: "+5.3%",
    isPositive: true,
    icon: IoPeopleOutline,
    bgColor: "bg-secondary/10", // secondary rangning 10% shaffofligi
    iconColor: "text-secondary", // DaisyUI secondary rang
  },
  {
    id: 4,
    title: "Menyu elementlari",
    value: "156",
    change: "-2.1%",
    isPositive: false, // kamayish error rangda ko'rsatiladi
    icon: IoRestaurantOutline,
    bgColor: "bg-warning/10", // warning rangning 10% shaffofligi
    iconColor: "text-warning", // DaisyUI warning rang
  },
];

// ============================================================
// SO'NGGI BUYURTMALAR MA'LUMOTLARI
// Dashboard pastki qismida jadval ko'rinishida ko'rsatiladi
// ============================================================
const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Ali Valiyev",
    item: "Spicy Burger",
    amount: "$12.50",
    status: "Tugallangan",
    statusColor: "badge-success", // DaisyUI badge rangi — yashil
  },
  {
    id: "#ORD-002",
    customer: "Malika Karimova",
    item: "Pizza Margarita",
    amount: "$18.00",
    status: "Tayyorlanmoqda",
    statusColor: "badge-warning", // DaisyUI badge rangi — sariq
  },
  {
    id: "#ORD-003",
    customer: "Jasur Toshmatov",
    item: "Caesar Salad",
    amount: "$9.50",
    status: "Yetkazilmoqda",
    statusColor: "badge-info", // DaisyUI badge rangi — ko'k
  },
  {
    id: "#ORD-004",
    customer: "Nilufar Ahmadova",
    item: "Steak Premium",
    amount: "$35.00",
    status: "Tugallangan",
    statusColor: "badge-success",
  },
  {
    id: "#ORD-005",
    customer: "Bobur Nazarov",
    item: "Sprite Avocado",
    amount: "$5.50",
    status: "Bekor qilingan",
    statusColor: "badge-error", // DaisyUI badge rangi — qizil
  },
];

// Dashboard komponenti — bosh sahifaning asosiy qismi
function Dashboard() {
  return (
    <PageContainer>
      {/* ============ SARLAVHA QISMI ============ */}
      <PageTitle
        title="Dashboard"
        description="Salom! Restoran boshqaruv panelinga xush kelibsiz."
      />

      {/* ============ STATISTIKA KARTALARI ============ */}
      {/* 4 ta ustunli grid — kichik ekranlarda 1, o'rtada 2, kattada 4 ustun */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* statsCards massivini map qilib har bir karta uchun UI yaratamiz */}
        {statsCards.map((card) => (
          <div
            key={card.id}
            className="bg-base-100 rounded-xl p-5 shadow-sm border border-base-200 hover:shadow-md transition-shadow duration-200"
          >
            {/* Karta yuqori qismi — sarlavha va ikonka */}
            <div className="flex items-center justify-between">
              {/* Sarlavha va qiymat */}
              <div>
                {/* Karta sarlavhasi — 50% shaffof matn */}
                <p className="text-sm text-base-content/50">{card.title}</p>
                {/* Karta qiymati — asosiy matn rangi */}
                <p className="text-2xl font-bold text-base-content mt-1">
                  {card.value}
                </p>
              </div>
              {/* Ikonka uchun dumaloq fon — DaisyUI semantic rang */}
              <div className={`${card.bgColor} p-3 rounded-full`}>
                {/* Dinamik ravishda ikonka komponentini chaqiramiz */}
                <card.icon className={`text-xl ${card.iconColor}`} />
              </div>
            </div>
            {/* O'sish / kamayish foizi */}
            <p className="text-sm mt-3">
              {/* success yoki error rangi — isPositive ga qarab */}
              <span className={card.isPositive ? "text-success" : "text-error"}>
                {card.change}
              </span>
              {/* O'tgan oyga nisbatan taqqoslash */}
              <span className="text-base-content/40 ml-1">
                o'tgan oyga nisbatan
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* ============ SO'NGGI BUYURTMALAR JADVALI ============ */}
      {/* bg-base-100 — DaisyUI asosiy fon (light: oq, dark: qora) */}
      <div className="bg-base-100 rounded-xl shadow-sm border border-base-200">
        {/* Jadval sarlavhasi */}
        <div className="p-5 border-b border-base-200">
          <h2 className="text-lg font-semibold text-base-content">
            So'nggi buyurtmalar
          </h2>
        </div>

        {/* Jadval — gorizontal scroll kichik ekranlarda ishlaydi */}
        <div className="overflow-x-auto">
          {/* DaisyUI table komponenti — avtomatik light/dark stillar */}
          <table className="table">
            {/* Jadval ustun nomlari */}
            <thead>
              <tr className="text-base-content/50">
                <th>Buyurtma ID</th>
                <th>Mijoz</th>
                <th>Taom</th>
                <th>Narx</th>
                <th>Holat</th>
              </tr>
            </thead>
            {/* Jadval tanasi — har bir buyurtmani map qilamiz */}
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover">
                  {/* Buyurtma raqami */}
                  <td className="font-medium">{order.id}</td>
                  {/* Mijoz ismi */}
                  <td>{order.customer}</td>
                  {/* Taom nomi */}
                  <td>{order.item}</td>
                  {/* Narxi */}
                  <td>{order.amount}</td>
                  {/* Holat badge — DaisyUI badge komponenti */}
                  <td>
                    <span className={`badge ${order.statusColor} badge-sm`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}

// Dashboard komponentini eksport qilamiz
export default Dashboard;
