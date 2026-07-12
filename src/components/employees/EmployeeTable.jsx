import { Trash } from "lucide-react";

const EmployeeTable = ({ loadingEmployees, employeesError, filteredEmployees, handleDeleteClick }) => {
  return (
    <div className="mt-4 overflow-x-auto">
          {loadingEmployees ? (
            <p className="text-center py-8">Loading employees...</p>
          ) : employeesError ? (
            <p className="text-center text-red-500 py-8">{employeesError}</p>
          ) : (
            <table className="min-w-[700px] w-full text-center border-separate border-spacing-y-3">
              <thead className="text-[#013C61] text-sm font-sf">
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>ROLE</th>
                </tr>
              </thead>
              <tbody className="font-sf text-[#6A7E8A] text-base">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="bg-white">
                      <td className="px-2 py-4">
                        <input type="checkbox" />
                      </td>
                      <td className="px-2 py-4">{employee.firstName}</td>
                      <td className="px-2 py-4">{employee.lastName}</td>
                      <td className="px-2 py-4">{employee.email}</td>
                      <td className="px-2 py-4">{employee.phone}</td>
                      <td className="px-2 py-4">{employee.role}</td>
                      <td>
                        <Trash
                          onClick={() => handleDeleteClick(employee)}
                          className="h-4 w-4 cursor-pointer hover:text-red-400"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
  )
}

export default EmployeeTable