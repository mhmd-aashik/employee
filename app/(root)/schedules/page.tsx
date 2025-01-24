import SchedulesCard from "@/components/SchedulesCard";
import { getAllEmployee } from "@/lib/actions/employee.action";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const scheduleData = await getAllEmployee();

  return (
    <div>
      <div className="px-2 py-5 flex justify-between max-w-7xl items-center">
        <h1 className="text-3xl font-bold">All Employees</h1>
        <Link
          href="/create-emp"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Employee
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {scheduleData?.map((data) => (
          <SchedulesCard
            key={data._id}
            _id={JSON.stringify(data._id)}
            scheduledStartTime={data.createdAt}
            scheduledDate={data.scheduledDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
