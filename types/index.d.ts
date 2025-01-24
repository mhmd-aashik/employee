export type EmployeeParams = {
  name?: string;
  position: string;
  skillset: string;
  availablestatus: boolean;
  path: string;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  taskDescription: string;
  skillRequired: string;
  status: string;
  scheduledDate: Date;
  dueDate: Date;
};

type EmployeeEditParams = {
  id: string;
  name: string;
  position: string;
  skillset: string;
  availablestatus: boolean;
  path: string;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  taskDescription: string;
  skillRequired: string;
  status: string;
  scheduledDate: Date;
  dueDate: Date;
};

type MachinaryProps = {
  name: string;
  type: string;
  maintenanceStatus: string;
  lastMaintenanceDate: Date;
  predictiveMaintenanceRequired: boolean;
  maintenanceType: string;
  scheduledDate: Date;
  status: string;
  path: string;
};

type MachinaryEditProps = {
  id: string;
  name: string;
  type: string;
  maintenanceStatus: string;
  lastMaintenanceDate: Date;
  predictiveMaintenanceRequired: boolean;
  maintenanceType: string;
  scheduledDate: Date;
  status: string;
  path: string;
};

// image: "",
// name: "",
// position: "",
// skillset: "",
// availablestatus: false,
// scheduledStartTime: new Date(),
// scheduledEndTime: new Date(),
// taskDescription: "",
// skillRequired: "",
// status: "",
// scheduledDate: new Date(),
// dueDate: new Date(),
