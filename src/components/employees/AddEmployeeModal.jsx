
const AddEmployeeModal = ({closeModal, handleAddEmployee, employeeData, handleEmployeeChange, employeeErrors, employeeApiError, addingEmployee }) => {
  return (
    <div className="fixed inset-0 bg-[#1B2420]/50 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg px-12 py-4">
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-xs flex items-center justify-center p-[10px] cursor-pointer bg-[#6A7E8A] rounded-full h-4 w-4 hover:text-[#ffffffaa] font-bold font-sf mb-6"
            >
              ✕
            </button>
            {/* Title */}
            <h2 className="md:text-[28px] text-[26px] font-bold font-sf text-[#013C61] mb-6 text-center">
              Add a new member of your team
            </h2>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              {/* First Name */}
              <input
                type="text"
                name="firstName"
                value={employeeData.firstName}
                onChange={handleEmployeeChange}
                className="w-full border-b border-[#E6E7EB] outline-none py-2"
                placeholder="First Name"
              />
              {employeeErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {employeeErrors.firstName}
                </p>
              )}

              {/* Last Name */}
              <input
                type="text"
                name="lastName"
                value={employeeData.lastName}
                onChange={handleEmployeeChange}
                className="w-full border-b border-[#E6E7EB] outline-none py-2"
                placeholder="Last Name"
              />

              {employeeErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {employeeErrors.lastName}
                </p>
              )}

              {/* Email */}
              <input
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleEmployeeChange}
                className="w-full border-b border-[#E6E7EB] outline-none py-2"
                placeholder="Email"
              />

              {employeeErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {employeeErrors.email}
                </p>
              )}

              {/* Phone Number */}
              <input
                type="text"
                name="phone"
                value={employeeData.phone}
                onChange={handleEmployeeChange}
                className="w-full border-b border-[#E6E7EB] outline-none py-2"
                placeholder="Phone Number"
              />

              {employeeErrors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {employeeErrors.phone}
                </p>
              )}

              {/* Assign Role */}
              <div className="relative w-full">
                <select
                  name="role"
                  value={employeeData.role}
                  onChange={handleEmployeeChange}
                  className="w-full h-12 rounded-md border border-gray-300 bg-white px-4 pr-10 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                >
                  <option value="">Assign Role</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>

                {employeeErrors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {employeeErrors.role}
                  </p>
                )}

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

              {employeeApiError && (
                <p className="text-red-500 text-sm">{employeeApiError}</p>
              )}

              {/* Button */}
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={addingEmployee}
                  className={`bg-[#2BDA53] ${addingEmployee ? "opacity-50 cursor-not-allowed text-sm" : "cursor-pointer"} text-white text-[18px] font-sf px-6 py-2 rounded-sm font-medium`}
                >
                  {addingEmployee ? "Sending..." : "Send Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default AddEmployeeModal