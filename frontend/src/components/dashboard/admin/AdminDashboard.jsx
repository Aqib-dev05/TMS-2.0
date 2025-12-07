import React from "react";
import Nav from "../../Nav";
import Form from "./Form";
import TaskInfo from "./TaskInfo";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#04070b] text-white">
      <Nav />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6">
        <Form />
        <TaskInfo />
      </main>
    </div>
  );
}

export default AdminDashboard;