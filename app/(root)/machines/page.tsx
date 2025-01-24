import MaintenanceCard from "@/components/MaintenanceCard";
import { getAllMachinary } from "@/lib/actions/machinary.action";
import Link from "next/link";
import React from "react";

export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getAllMachinary();

  console.log(data, "data");

  return (
    <div>
      <div className="px-2 py-5 flex justify-between max-w-7xl items-center">
        <h1 className="text-3xl font-bold">All Employees</h1>
        <Link
          href="/create-emp"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Machinaris
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.map((machinary) => {
          return (
            <MaintenanceCard
              key={machinary._id}
              _id={machinary._id}
              name={machinary.name}
              type={machinary.type}
              maintenanceStatus={machinary.maintenanceStatus}
              lastMaintenanceDate={machinary.lastMaintenanceDate}
              predictiveMaintenanceRequired={
                machinary.predictiveMaintenanceRequired
              }
              scheduledDate={machinary.scheduledDate}
              maintenanceType={machinary.maintenanceType}
              status={machinary.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
