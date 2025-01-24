import EditEmployeeCard from "@/components/EditEmployeeCard";
import { getEmployeeById } from "@/lib/actions/employee.action";
import React from "react";

export const revalidate = 0;

const EditEmployee = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const getEmployee = await getEmployeeById(id);

  console.log(getEmployee, "from edit page");

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <div>
        <h1 className="text-3xl font-bold text-center hidden">
          Create Employee
        </h1>
      </div>
      <EditEmployeeCard
        id={id}
        name={getEmployee?.name}
        position={getEmployee?.position}
        skillset={getEmployee?.skillset}
        availablestatus={getEmployee?.availablestatus}
        image={getEmployee?.image}
        scheduledStartTime={getEmployee?.scheduledStartTime}
        scheduledEndTime={getEmployee?.scheduledEndTime}
        taskDescription={getEmployee?.taskDescription}
        skillRequired={getEmployee?.skillRequired}
        status={getEmployee?.status}
        scheduledDate={getEmployee?.scheduledDate}
        dueDate={getEmployee?.dueDate}
      />
    </div>
  );
};

export default EditEmployee;
