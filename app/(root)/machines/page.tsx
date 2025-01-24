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
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          All Machinaries
        </h1>
        <Link
          href="/create-machinary"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base"
        >
          Create Machinaries
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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
