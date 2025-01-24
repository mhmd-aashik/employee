import { ChartEmp } from "@/components/ChartEmp";
import EmployeeCount from "@/components/EmployeeCount";
import {
  employeeGraph,
  getAllEmploeeCount,
  getAllMachineCount,
} from "@/lib/actions/counts.actions";

export default async function HomePage() {
  const emploeeCount = await getAllEmploeeCount();
  const machineCount = await getAllMachineCount();
  const empGraph = JSON.parse(JSON.stringify(await employeeGraph()));
  console.log(empGraph, "empGraph");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <EmployeeCount
          name="Employees"
          title="Total Employees"
          countData={emploeeCount!}
          link="/employee-data"
        />

        <EmployeeCount
          name="Tasks"
          title="Total Tasks"
          countData={emploeeCount!}
          link="/employee-data"
        />

        <EmployeeCount
          name="Machine"
          title="Total Machines"
          countData={machineCount!}
          link="/machines"
        />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <ChartEmp empGraph={empGraph} />
      </div>
    </div>
  );
}
