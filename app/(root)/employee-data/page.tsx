import EmployeesCard from "@/components/EmployeesCard";
import { getAllEmployee } from "@/lib/actions/employee.action";
import Link from "next/link";
import React from "react";

export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

type Employee = {
  _id: string;
  name: string;
  position: string;
  skillset: string;
  availablestatus: boolean;
  image: string;
};

const Page = async () => {
  const employeeData = await getAllEmployee();

  console.log(employeeData, "from page");

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
        {employeeData?.map((employee: Employee) => (
          <EmployeesCard
            key={employee._id}
            id={JSON.stringify(employee._id)}
            name={employee.name}
            position={employee.position}
            skillset={employee.skillset!}
            availablestatus={employee.availablestatus!}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
