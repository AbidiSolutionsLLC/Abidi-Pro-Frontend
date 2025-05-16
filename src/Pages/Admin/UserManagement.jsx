import React, { useState } from "react";
import CreateUserModal from "../../Components/CreateUserModal";
 
const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: "101",
      name: "Murtaza Mahmood",
      email: "mmehmood@abidisolutions.com",
      department: "Software Development",
      role: "Admin",
      status: "Active",
    },
    {
      id: "102",
      name: "Munawar Tirmizi",
      email: "mtirmizi@abidisolutions.com",
      department: "Marketing",
      role: "Employee",
      status: "Inactive",
    },
    {
      id: "103",
      name: "Adil Abbas Khuhro",
      email: "akhuhro@abidisolutions.com",
      department: "Software Development",
      role: "Employee",
      status: "Inactive",
    },
  ]);
 
  const [sortKey, setSortKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const handleCreateUser = () => setIsModalOpen(true);
 
  const handleSort = (e) => {
    const key = e.target.value;
    setSortKey(key);
    const sorted = [...users].sort((a, b) => a[key].localeCompare(b[key]));
    setUsers(sorted);
  };
 
  return (
    <div className="min-h-screen bg-[#dce3f0] p-4 m-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-primary px-6 py-3 rounded-md mx-6">
        <h2 className="text-xl font-semibold text-white">User Management</h2>
        <button
          onClick={handleCreateUser}
          className="text-white px-5 py-2 font-semibold"
        >
          Create User
        </button>
      </div>
 
      {/* Sort Dropdown */}
      <div className="flex justify-end px-6 mb-4">
        <select
          className="px-4 py-2 rounded-md border text-sm"
          onChange={handleSort}
          value={sortKey}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="department">Department</option>
          <option value="role">Role</option>
        </select>
      </div>
 
      {/* Table */}
      <div className="px-6">
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full table-auto text-sm text-left text-gray-600">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.department}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* Modal Component */}
      <CreateUserModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
};
 
export default UserManagement;
 
 