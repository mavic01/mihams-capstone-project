import { Search } from "lucide-react"
const centerDashArrowLeft = "./centerDashArrowLeft.png";
const centerDashArrowRight = "./centerDashArrowRight.png";

const EmployeesFilter = ({ selectedRole, setSelectedRole, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            {/* Change Role Dropdown */}
            <div className="relative w-64">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full h-12 rounded-md border border-gray-300 bg-white px-4 pr-10 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>

              {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Change Button */}
            <button
              disabled
              title="Coming soon"
              type="button"
              // className="h-12 px-10 rounded-md bg-[#2BDA53] text-white text-sm font-semibold font-sf hover:bg-[#43b13b] transition-colors duration-200 cursor-pointer"
              className="h-12 px-10 rounded-md bg-[#2BDA53] text-gray-500 bg-gray-300 text-sm font-semibold font-sf transition-colors duration-200 cursor-not-allowed"
            >
              Change
            </button>

            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px] max-w-lg">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter staff name here..."
                className="w-full h-12 rounded-md border border-gray-300 pl-4 pr-12 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <Search
                size={22}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <span className="flex items-center gap-2">
              <span className="font-normal font-sf px-2 rounded-md border border-[#013c61]/10">
                1
              </span>
              <span className="font-normal font-sf text-[#013C61]">of 2</span>
            </span>

            <span className="flex items-center gap-2">
              <img
                className="cursor-pointer w-[18px] h-[18px]"
                src={centerDashArrowLeft}
                alt="Left Arrow"
              />
              <img
                className="cursor-pointer w-[18px] h-[18px]"
                src={centerDashArrowRight}
                alt="Right Arrow"
              />
            </span>
          </div>
        </div>
  )
}

export default EmployeesFilter