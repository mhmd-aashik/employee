"use client";

import React from "react";
import { Button } from "./ui/button";
import { deleteEmployee } from "@/lib/actions/employee.action";
import { usePathname, useRouter } from "next/navigation";

const DeleteBtn = ({ id }: { id: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(id, "from delete btn");

  async function handleDelete() {
    try {
      await deleteEmployee({
        id,
        path: pathname,
      });
      router.push("/employee-data");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
    >
      Delete
    </Button>
  );
};

export default DeleteBtn;
