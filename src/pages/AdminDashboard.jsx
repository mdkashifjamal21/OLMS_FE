import React, { useState } from "react";
import UserTable from "../components/UserTable";
import BookManager from "../components/BookManager";
import IssuedBooksTable from "../components/IssuedBooksTable";
import { Button } from "../components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Section = ({ title, open, onClick, children }) => (
  <div className="mb-6">
    <Button onClick={onClick} className="flex items-center gap-2 text-lg font-bold">
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
  const [active, setActive] = useState(null);

  const toggle = (section) => {
    setActive(active === section ? null : section);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <Section title="Registered Users" open={active === "users"} onClick={() => toggle("users")}>
        <UserTable />
      </Section>

      <Section title="Books" open={active === "books"} onClick={() => toggle("books")}>
        <BookManager />
      </Section>

      <Section title="Issued Books" open={active === "issued"} onClick={() => toggle("issued")}>
        <IssuedBooksTable />
      </Section>
    </div>
  );
};

export default AdminDashboard;
