import { useState, useEffect } from "react";
import api from "../api/axios";
import AddEmployeeModal from "../components/employees/AddEmployeeModal";
import DeleteEmployeeModal from "../components/employees/DeleteEmployeeModal";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeesFilter from "../components/employees/EmployeesFilter";


const Employees = () => {
  const firstName = localStorage.getItem("firstName");

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // get all employees states
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true); //loading state
  const [employeesError, setEmployeesError] = useState(""); //"" is falsey

  // New Employee Data States
  const initialEmployeeData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  };
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [employeeErrors, setEmployeeErrors] = useState({});
  const [employeeApiError, setEmployeeApiError] = useState("");
  const [addingEmployee, setAddingEmployee] = useState(false); //loading state

  // Delete Employee States
  const [deletingEmployee, setDeletingEmployee] = useState(false); //loading state

  //search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");

        setEmployees(response.data);
      } catch (error) {
        // console.log(error);

        if (error.response?.status === 401) {
          setEmployeesError("Please sign in again.");
        } else {
          setEmployeesError("Unable to load employees."); //any error other than 401 - server down, wrong url, db problems, bad internet etc.
        }
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteModal(true);
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      setDeletingEmployee(true);

      await api.delete(`/employees/${selectedEmployee.id}`);

      setEmployees((prev) =>
        prev.filter((employee) => employee.id !== selectedEmployee.id),
      );

      setOpenDeleteModal(false);

      setSelectedEmployee(null);

      // console.log("Employee deleted successfully");
    } catch (error) {
      // console.log(error);

      if (error.response?.status === 401) {
        setEmployeeApiError("Please sign in again.");
      } else {
        setEmployeeApiError("Unable to delete employee.");
      }
    } finally {
      setDeletingEmployee(false);
    }
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;

    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setEmployeeErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setEmployeeApiError("");
  };

  const validateEmployee = () => {
    const newErrors = {};

    if (!employeeData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!employeeData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!employeeData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!employeeData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!employeeData.role.trim()) {
      newErrors.role = "Please select a role";
    }

    setEmployeeErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    if (!validateEmployee()) return;

    try {
      setAddingEmployee(true);
      const response = await api.post("/employees", employeeData);

      setEmployees((prev) => [...prev, response.data]); //new employee added to the table

      setEmployeeData(initialEmployeeData);

      setEmployeeErrors({});

      setEmployeeApiError("");

      setOpenModal(false);
    } catch (error) {
      // console.log(error);

      if (error.response?.status === 401) {
        setEmployeeApiError("Please sign in again.");
      } else {
        setEmployeeApiError("Unable to add employee.");
      }
    } finally {
      setAddingEmployee(false);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      employee.firstName.toLowerCase().includes(search) ||
      employee.lastName.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search);

    const matchesRole = selectedRole === "" || employee.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const closeModal = () => {
    setOpenModal(false);

    setEmployeeData(initialEmployeeData);

    setEmployeeErrors({});
    setEmployeeApiError("");
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedEmployee(null);
    setEmployeeApiError("");
  };

  return (
    <section className="bg-[#F6F8F8] p-6 lg:p-10 min-h-full space-y-6">
      {/* Add Employee Modal */}
      {openModal && (
        <AddEmployeeModal closeModal={closeModal} handleAddEmployee={handleAddEmployee} employeeData={employeeData} handleEmployeeChange={handleEmployeeChange} employeeErrors={employeeErrors} employeeApiError={employeeApiError} addingEmployee={addingEmployee} />
      )}

      {/* Delete Modal */}
      {openDeleteModal && (
        <DeleteEmployeeModal selectedEmployee={selectedEmployee} closeDeleteModal={closeDeleteModal} handleDeleteEmployee={handleDeleteEmployee} deletingEmployee={deletingEmployee} />
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-sf font-bold text-[20px] md:text-[26px] text-[#013C61]">
          Employees
        </p>

        <button
          className="w-full md:w-auto
          text-white
          text-[16px] md:text-[18px]
          bg-[#2BDA53]
          hover:bg-[#09bc33]
          font-sf
          font-bold
          rounded-sm
          px-6
          md:px-10
          py-3
          cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Add New
        </button>
      </div>

      <div className="bg-white p-6 flex md:flex-row flex-col items-center justify-between">
        <p className="md:text-[36px] text-[30px] text-[#013C61] font-sf font-bold">
          {firstName || "Josh"} Bakery Ventures
        </p>
        <p className="font-sf md:text-[22px] text-[20px] text-[#013C61]">
          62, Bode Thomas, Surulere, Lagos
        </p>
      </div>

      {/* Employee Filter and Table */}
      <div className="mt-10">
        {/* HEADER - Employee filter and Pagination */}
        <EmployeesFilter selectedRole={selectedRole} setSelectedRole={setSelectedRole} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        

        {/* Employee Table */}
        <EmployeeTable loadingEmployees={loadingEmployees} employeesError={employeesError} filteredEmployees={filteredEmployees} handleDeleteClick={handleDeleteClick} />
        
      </div>
    </section>
  );
};

export default Employees;
