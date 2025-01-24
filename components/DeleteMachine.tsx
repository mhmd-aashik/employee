import React from "react";
import { Button } from "./ui/button";
import { deleteMachinary } from "@/lib/actions/machinary.action";

const DeleteMachine = () => {
  const id = "some-id"; // Define the id here

  async function handledeleteMachine() {
    try {
      await deleteMachinary(id);
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
