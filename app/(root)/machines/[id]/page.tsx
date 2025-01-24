import DeleteMachine from "@/components/DeleteMachine";
import { Button } from "@/components/ui/button";
import { getMachinaryById } from "@/lib/actions/machinary.action";
import Link from "next/link";
import React from "react";

// Define the interface for the maintenance details
// type MaintenanceDetails = {
//   name: string;
//   type: string;
//   maintenanceStatus: string;
//   lastMaintenanceDate: string;
//   predictiveMaintenanceRequired: boolean;
//   scheduledDate: string;
//   maintenanceType: string;
//   status: string;
// };

const MaintenancePage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const maintenanceData = await getMachinaryById(id);
  console.log(maintenanceData, "maintenanceData");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Maintenance Details
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-800">{maintenanceData.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Type:</span>
            <span className="text-gray-800">{maintenanceData.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className={`font-semibold ${
                maintenanceData.maintenanceStatus === "OPERATIONAL"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {maintenanceData.maintenanceStatus}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">
              Last Maintenance Date:
            </span>
            <span className="text-gray-800">
              {maintenanceData.lastMaintenanceDate.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">
              Predictive Maintenance Required:
            </span>
            <span className="text-gray-800">
              {maintenanceData.predictiveMaintenanceRequired ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Scheduled Date:</span>
            <span className="text-gray-800">
              {maintenanceData.scheduledDate.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Maintenance Type:</span>
            <span className="text-gray-800">
              {maintenanceData.maintenanceType}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">
              Completion Status:
            </span>
            <span
              className={`font-semibold ${
                maintenanceData.status === "COMPLETED"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {maintenanceData.status}
            </span>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Link href={`/edit-machine/${id}`}>
            <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Edit
            </Button>
          </Link>

          <DeleteMachine />
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
