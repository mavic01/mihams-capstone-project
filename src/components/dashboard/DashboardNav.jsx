
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navLogo = "./dashboardLogo.png";
const navDownArrow = "./dashboard-downArrow.png";

const DashboardNav = () => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const firstName = localStorage.getItem("firstName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-xs px-4 md:px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <img
          className="h-8 md:h-10"
          src={navLogo}
          alt="Dashboard Logo"
        />
      </Link>

      {/* User */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="w-8 h-8 md:w-[35px] md:h-[35px] rounded-full bg-[#6A7E8A]"></span>

          <span className="text-[#013C61] font-sf font-medium text-sm md:text-base">
            Hi, {firstName || "There"}
          </span>

          <img
            className={`w-2 h-2 transition-transform duration-200 ${
              showDropdown ? "rotate-180" : ""
            }`}
            src={navDownArrow}
            alt="Toggle menu"
          />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-[#013C61] font-sf hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNav;