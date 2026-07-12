const icon1Normal = "./LeftDashIcon1Normal.png";
const icon1Active = "./LeftDashIcon1Active.png";

const icon2Normal = "./LeftDashIcon2Normal.png";
const icon2Active = "./LeftDashIcon2Active.png";

const icon3Normal = "./LeftDashIcon3Normal.png";
const icon3Active = "./LeftDashIcon3Active.png";

const DashboardSidebarPanel = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: "dashboard",
      icon: icon1Normal,
      activeIcon: icon1Active,
      alt: "Dashboard",
    },
    {
      id: "employees",
      icon: icon2Normal,
      activeIcon: icon2Active,
      alt: "Employees",
    },
    {
      id: "cards",
      icon: icon3Normal,
      activeIcon: icon3Active,
      alt: "cards",
    },
  ];

  return (
    <aside
      className="
        bg-white
        w-full lg:w-[80px]
        px-2 py-4 lg:py-16
        flex flex-row lg:flex-col
        items-center
        justify-around lg:justify-start
        gap-6 lg:gap-12
        shrink-0
        border-b lg:border-b-0
      "
    >
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`
              cursor-pointer
              transition-all
              ${
                isActive
                  ? "md:border-l-2 md:border-[#2BDA53] md:pl-4"
                  : ""
              }
            `}
          >
            <img
              className="w-[22px] h-[19px] object-contain"
              src={isActive ? item.activeIcon : item.icon}
              alt={item.alt}
            />
          </button>
        );
      })}
    </aside>
  );
};

export default DashboardSidebarPanel;
