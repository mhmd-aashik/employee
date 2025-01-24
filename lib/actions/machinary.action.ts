"use server";

import Machinery from "@/database/machinary.models";
import dbConnect from "../mongoose";
import { MachinaryEditProps, MachinaryProps } from "@/types";
import { revalidatePath } from "next/cache";

export const getAllMachinary = async () => {
  // .lean();
  try {
    await dbConnect();
    const machinary = await Machinery.find({});
    return machinary;
  } catch (error) {
    console.log(error);
  }
};

export const getMachinaryById = async (id: string) => {
  try {
    await dbConnect();
    const machinary = await Machinery.findById(id);
    return machinary;
  } catch (error) {
    console.log(error);
  }
};

export const createMachinary = async (machinary: MachinaryProps) => {
  try {
    await dbConnect();
    const {
      name,
      type,
      maintenanceStatus,
      lastMaintenanceDate,
      predictiveMaintenanceRequired,
      scheduledDate,
      maintenanceType,
      status,
      path,
    } = machinary;
    const newMachinary = await Machinery.create({
      name,
      type,
      maintenanceStatus,
      lastMaintenanceDate,
      predictiveMaintenanceRequired,
      maintenanceType,
      scheduledDate,
      status,
    });
    revalidatePath(path);
    console.log(newMachinary, "newMachinary");
  } catch (error) {
    console.log(error);
    throw new Error("Error creating machinary");
  }
};

export const updateMachinary = async (machinary: MachinaryEditProps) => {
  try {
    await dbConnect();
    const {
      id,
      name,
      type,
      maintenanceStatus,
      lastMaintenanceDate,
      predictiveMaintenanceRequired,
      scheduledDate,
      maintenanceType,
      status,
      path,
    } = machinary;
    await Machinery.findOneAndUpdate(
      { _id: id },
      {
        name,
        type,
        maintenanceStatus,
        lastMaintenanceDate,
        predictiveMaintenanceRequired,
        maintenanceType,
        scheduledDate,
        status,
      },
      { new: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMachinary = async (id: string) => {
  try {
    await dbConnect();
    await Machinery.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};
