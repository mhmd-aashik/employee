import { Schema, models, model } from "mongoose";

export interface IEmployee {
  name: string;
  position?: string;
  skillset?: string;
  availablestatus?: boolean;
  scheduledStartTime?: Date;
  scheduledEndTime?: Date;
  taskDescription?: string;
  skillRequired?: string;
  status?: string;
  scheduledDate?: Date;
  dueDate?: Date;
  createdAt: Date;
}

const EntitySchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  skillset: { type: String, required: true },
  availablestatus: { type: Boolean, required: true, default: false },
  scheduledStartTime: { type: Date, required: true },
  scheduledEndTime: { type: Date, required: true },
  taskDescription: { type: String, required: true },
  skillRequired: { type: String, required: true },
  status: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Employee = models?.Employee || model<IEmployee>("Employee", EntitySchema);

export default Employee;

// export enum TaskStatus {
//   PENDING = "PENDING",
//   IN_PROGRESS = "IN_PROGRESS",
//   COMPLETED = "COMPLETED",
//   CANCELLED = "CANCELLED",
// }
