
const DeleteEmployeeModal = ({ selectedEmployee, closeDeleteModal, handleDeleteEmployee, deletingEmployee }) => {
  return (
    <div className="fixed inset-0 bg-[#1B2420]/50 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-12">
            <div className="space-y-6">
              <h2 className="text-[#013C61] md:text-[30px] text-[24px] font-sf font-bold text-center">
                Delete Employee
              </h2>
              <p className="text-[18px] text-[#6A7E8A] font-sf text-center">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                </span>
                ?
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={closeDeleteModal}
                  className="md:text-[18px] text-sm text-[#013C61] font-sf font-bold border-[0.7px] border-[#013C61] cursor-pointer px-6 py-2 rounded-sm hover:bg-[#013C61]/20 transition-colors transition-all"
                >
                  No, Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteEmployee}
                  disabled={deletingEmployee}
                  className={`md:text-[18px] text-sm text-[#fff] bg-[#2BDA53] font-sf font-bold cursor-pointer px-6 py-2 rounded-sm ${
                    deletingEmployee
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#0e9b2f]"
                  } transition-colors transition-all`}
                >
                  {deletingEmployee ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default DeleteEmployeeModal