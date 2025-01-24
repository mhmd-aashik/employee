import EditMachineForm from "@/components/EditMachineForm";
import { getMachinaryById } from "@/lib/actions/machinary.action";
import React from "react";

export const revalidate = 0;

const EditMachine = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const getMachine = await getMachinaryById(id);

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <div>
        <h1 className="text-3xl font-bold text-center hidden">Edit Machine</h1>
      </div>
      <EditMachineForm
        machineId={getMachine?._id.toString()}
        type={getMachine?.type}
        name={getMachine?.name}
        maintenanceStatus={getMachine?.maintenanceStatus}
        lastMaintenanceDate={getMachine?.lastMaintenanceDate}
        predictiveMaintenanceRequired={
          getMachine?.predictiveMaintenanceRequired
        }
        maintenanceType={getMachine?.maintenanceType.toString()}
        scheduledDate={getMachine?.scheduledDate.toString()}
        status={getMachine?.status}
      />
    </div>
  );
};

export default EditMachine;
