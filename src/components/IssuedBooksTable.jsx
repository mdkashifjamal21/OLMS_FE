import React from "react";

const IssuedBooksTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-4 py-2">Book Title</th>
            <th className="px-4 py-2">Issued To</th>
            <th className="px-4 py-2">Issue Date</th>
            <th className="px-4 py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2">Book {i}</td>
              <td className="px-4 py-2">User {i}</td>
              <td className="px-4 py-2">2025-07-0{i}</td>
              <td className="px-4 py-2">2025-07-1{i}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuedBooksTable;
