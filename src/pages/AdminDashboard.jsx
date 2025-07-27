import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import BookManager from "../components/BookManager";
import IssuedBooksTable from "../components/IssuedBooksTable";
import { Button } from "../components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Section = ({ title, open, onClick, children }) => (
  <div className="mb-6">
    <Button
      onClick={onClick}
      className="flex items-center gap-2 text-lg font-bold hover:scale-105 transition"
    >
      <PlusCircle className="w-5 h-5" />
      {title}
    </Button>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden mt-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const AdminDashboard = () => {
  const [active, setActive] = useState("users"); // ✅ Default section open
  const user = JSON.parse(localStorage.getItem("olmsUser"));

  const toggle = (section) => {
    setActive(active === section ? null : section);
  };

  // ✅ If no user is logged in, show fallback
  if (!user) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600">Please login to view this page.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Admin Dashboard
      </h1>

      <Section title="Registered Users" open={active === "users"} onClick={() => toggle("users")}>
        <UserTable />
      </Section>

      <Section title="Books" open={active === "books"} onClick={() => toggle("books")}>
        <BookManager />
      </Section>

      <Section title="Issued Books" open={active === "issued"} onClick={() => toggle("issued")}>
        <IssuedBooksTable />
      </Section>
    </motion.div>
  );
};

export default AdminDashboard;