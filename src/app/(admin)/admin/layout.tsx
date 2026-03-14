import React from "react";
import AdminAuthGate from "@/components/admin/AdminAuthGate";
import "../../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AdminAuthGate>
          {children}
        </AdminAuthGate>
      </body>
    </html>
  );
}
