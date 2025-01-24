"use server";

import Employee from "@/database/employees.models";
import dbConnect from "../mongoose";
import { EmployeeEditParams, EmployeeParams } from "@/types";
import { revalidatePath } from "next/cache";

export const getAllEmployee = async () => {
  try {
    await dbConnect();
    const getEmployee = await Employee.find();
    return getEmployee;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const getDataId = await Employee.findById(id);
    return getDataId;
  } catch (error) {
    console.error(error);
  }
};

export const createEmployee = async (params: EmployeeParams) => {
  console.log(params, "from server");
  try {
    await dbConnect();
    const {
      name,
      position,
      skillset,
      availablestatus,
      scheduledStartTime,
      scheduledEndTime,
      taskDescription,
      skillRequired,
      status,
      scheduledDate,
      dueDate,
      path,
    } = params;

    console.log(name, position, skillset, availablestatus, "from server");

    const newUser = await Employee.create({
      name,
      position,
      skillset,
      availablestatus,
      scheduledStartTime,
      scheduledEndTime,
      taskDescription,
      skillRequired,
      status,
      scheduledDate,
      dueDate,
    });

    revalidatePath(path);

    console.log("uploaded successfully", newUser);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (params: EmployeeEditParams) => {
  try {
    await dbConnect();

    const {
      id,
      name,
      position,
      skillset,
      availablestatus,
      path,
      scheduledStartTime,
      scheduledEndTime,
      taskDescription,
      skillRequired,
      status,
      scheduledDate,
      dueDate,
    } = params;

    const updateData = await Employee.findOneAndUpdate(
      { _id: id },
      {
        name,
        position,
        skillset,
        availablestatus,
        scheduledStartTime,
        scheduledEndTime,
        taskDescription,
        skillRequired,
        status,
        scheduledDate,
        dueDate,
      },
      { new: true, runValidators: true }
    );

    revalidatePath(path);

    console.log(updateData, "from server successfully updated");
  } catch (error) {
    console.error(error);
  }
};

export const deleteEmployee = async ({
  id,
  path,
}: {
  id: string;
  path: string;
}) => {
  try {
    await dbConnect();
    const deleteData = await Employee.findByIdAndDelete(id);

    revalidatePath(path);
    console.log(deleteData, "from server successfully deleted");
  } catch (error) {
    console.error(error);
  }
};
