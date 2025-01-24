"use server";

import Employee from "@/database/employees.models";
// import Employee from "@/database/employee.model";
import dbConnect from "../mongoose";
import Machinery from "@/database/machinary.models";

export const getAllEmploeeCount = async () => {
  try {
    await dbConnect();
    const getEmployee = await Employee.find();
    return getEmployee.length;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMachineCount = async () => {
  try {
    await dbConnect();
    const getMachine = await Machinery.find();
    return getMachine.length;
  } catch (error) {
    console.log(error);
  }
};

// export const totalAllTask = async () => {
//   try {
//     const getTask = await Task.find();
//     return getTask.length;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const employeeGraph = async () => {
  try {
    dbConnect();
    const getGraph = await Employee.find().select("createdAt");
    return getGraph;
  } catch (error) {
    console.log(error);
  }
};
