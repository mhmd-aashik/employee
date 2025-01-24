"use client";
import React from "react";
import { Button } from "./ui/button";
import { deleteMachinary } from "@/lib/actions/machinary.action";
import { useRouter } from "next/navigation";

const DeleteMachine = ({ id }: { id: string }) => {
  const router = useRouter();

  async function handledeleteMachine() {
    try {
      await deleteMachinary(id);
      router.push("/machines");
      console.log("delete machine", id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      onClick={handledeleteMachine}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Delete
    </Button>
  );
};

export default DeleteMachine;
