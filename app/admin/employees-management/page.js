"use client";

import React from "react";
import { EmployeeProvider } from "./context/EmployeeContext";
import EmployeesManagementContent from "./_components/EmployeesManagementContent";

// Page component with provider
export default function EmployeesManagementPage() {
  return (
    <EmployeeProvider>
      <EmployeesManagementContent />
    </EmployeeProvider>
  );
}