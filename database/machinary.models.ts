import { Schema, models, model } from "mongoose";

// Enums for TaskStatus and MaintenanceStatus
export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum MaintenanceStatus {
  OPERATIONAL = "OPERATIONAL",
  UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
  REPAIR_NEEDED = "REPAIR_NEEDED",
}

// Combined Interface
export interface IMachinery {
  name: string;
  type: string;
  maintenanceStatus: MaintenanceStatus;
  lastMaintenanceDate: Date;
  predictiveMaintenanceRequired: boolean;
  scheduledDate: Date;
  maintenanceType: string;
  status: TaskStatus;
  createdAt: Date;
}

const MachineryMaintenanceSchema = new Schema<IMachinery>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  maintenanceStatus: { type: String, enum: MaintenanceStatus, required: true },
  lastMaintenanceDate: { type: Date },
  predictiveMaintenanceRequired: { type: Boolean, default: false },
  scheduledDate: { type: Date, required: true },
  maintenanceType: { type: String, required: true },
  status: { type: String, enum: TaskStatus, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Machinery =
  models?.Machinery ||
  model<IMachinery>("Machinery", MachineryMaintenanceSchema);

export default Machinery;
