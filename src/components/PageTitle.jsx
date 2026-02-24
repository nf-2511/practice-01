// PageTitle.jsx — Sahifa sarlavhasi: barcha sahifalarda qaytariladigan title + description
// Props: title — sahifa nomi, description — qo'shimcha tavsif matni
const PageTitle = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-base-content">{title}</h1>
      {description && (
        <p className="text-base-content/50 text-sm mt-1">{description}</p>
      )}
    </div>
  );
};

export default PageTitle;
