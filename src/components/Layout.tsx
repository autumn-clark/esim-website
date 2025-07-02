import React from "react";
import Link from "next/link";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />
      <Sidebar />
      {/* Page content */}
      <main className="ml-56 px-4 bg-gray-50 pt-24">{children}</main>вввввввввв
    </div>
  );
}
