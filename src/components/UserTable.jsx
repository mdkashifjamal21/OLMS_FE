import React from "react";

const UserTable = () => {
  // Dummy user data similar to what gets submitted from Register.jsx
  const users = [
    { name: "Alice", email: "alice@mail.com", role: "student" },
    { name: "Bob", email: "bob@mail.com", role: "admin" },
    { name: "Charlie", email: "charlie@mail.com", role: "librarian" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 capitalize">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
