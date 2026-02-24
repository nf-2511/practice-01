// PageContainer.jsx — Sahifa konteyneri: barcha sahifalar uchun umumiy wrapper
// Props: children — ichki kontent (sahifa mazmuni)
const PageContainer = ({ children }) => {
  return <div className="space-y-6">{children}</div>;
};

export default PageContainer;
