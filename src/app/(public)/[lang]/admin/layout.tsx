import React from "react";
import AdminAuthGate from "@/components/admin/AdminAuthGate";

export default function LangAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthGate>{children}</AdminAuthGate>;
}
