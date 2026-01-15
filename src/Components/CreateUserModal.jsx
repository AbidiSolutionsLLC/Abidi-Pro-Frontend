import React, { useState, useEffect } from "react";
import api from "../axios"; // Ensure this path is correct
import { toast } from "react-toastify";

const CreateUserModal = ({ isOpen, setIsOpen }) => {
  // Lists for Dropdowns
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    empID: "",
    name: "",
    email: "",
    password: "", // Required for creation
    designation: "",
    department: "", // Stores ObjectId
    reportsTo: "",  // Stores ObjectId
    role: "Employee",
    empType: "Permanent",
    joiningDate: "",
    phoneNumber: "",
    branch: "Karachi",
    timeZone: "Asia/Karachi"
  });

  // Fetch Departments & Managers when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          // 1. Fetch Departments (Create this endpoint if not exists)
          // const deptRes = await api.get("/departments"); 
          // setDepartments(deptRes.data);
          
          // MOCK DATA (Remove this block when API is ready)
          setDepartments([
            { _id: "65d4b1...", name: "Software Development" },
            { _id: "65d4b2...", name: "Human Resources" },
            { _id: "65d4b3...", name: "Sales & Marketing" }
          ]);

          // 2. Fetch Users to populate "Reports To"
          const usersRes = await api.get("/users");
          setManagers(usersRes.data);
        } catch (error) {
          console.error("Failed to fetch form data", error);
          toast.error("Could not load departments or managers.");
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/users", formData);
      toast.success("User created successfully!");
      setIsOpen(false);
      // Reset form (optional)
      setFormData({
        empID: "", name: "", email: "", password: "", designation: "",
        department: "", reportsTo: "", role: "Employee", empType: "Permanent",
        joiningDate: "", phoneNumber: "", branch: "Karachi", timeZone: "Asia/Karachi"
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to create user";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[9999] flex justify-end">
      <div className="w-full sm:w-[800px] bg-white h-full p-6 shadow-lg rounded-l-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Create New User</h2>
          <button
            className="text-gray-500 hover:text-red-500 text-2xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: ID, Name, Email */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="empID"
                value={formData.empID}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                placeholder="e.g. EMP-001"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Row 2: Password, Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                placeholder="Min 6 characters"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          <hr className="border-gray-200 my-4" />
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Employment Details</h3>

          {/* Row 3: Role, Designation, Emp Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role <span className="text-red-500">*</span></label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">Super Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g. Software Engineer"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type <span className="text-red-500">*</span></label>
              <select
                name="empType"
                value={formData.empType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="Permanent">Permanent</option>
                <option value="Contractor">Contractor</option>
                <option value="Intern">Intern</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
          </div>

          {/* Row 4: Department & Manager */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reports To (Manager)</label>
              <select
                name="reportsTo"
                value={formData.reportsTo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="">No Manager (Top Level)</option>
                {managers.map((mgr) => (
                  <option key={mgr._id} value={mgr._id}>
                    {mgr.name} ({mgr.designation})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 5: Joining Date, Branch, Timezone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone <span className="text-red-500">*</span></label>
              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="Asia/Karachi">Asia/Karachi</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:brightness-110 transition flex items-center"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;