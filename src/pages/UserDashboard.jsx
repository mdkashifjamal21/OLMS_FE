import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const issuedBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    issueDate: '2025-07-10',
    returnDate: '2025-07-20',
    status: 'Returned',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    issueDate: '2025-07-15',
    returnDate: '2025-07-25',
    status: 'Due',
  },
];

const UserDashboard = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800" data-aos="fade-down">
        Welcome back, Reader 👋
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📚 Issued Books</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Issued Date</th>
                <th className="px-4 py-2">Return Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((book, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-all duration-300">
                  <td className="px-4 py-3">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">{book.issueDate}</td>
                  <td className="px-4 py-3">{book.returnDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        book.status === 'Returned'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))}
              {issuedBooks.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No books issued yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
