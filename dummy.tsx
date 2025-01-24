"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/components/ui"; // Update based on your actual imports

export enum MaintenanceStatus {
  OPERATIONAL = "OPERATIONAL",
  UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
  REPAIR_NEEDED = "REPAIR_NEEDED",
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

const FormSchema = z.object({
  machineId: z.string().min(1, "Machine ID is required."),
  type: z.string().min(1, "Type is required."),
  maintenanceStatus: z.nativeEnum(MaintenanceStatus, {
    errorMap: () => ({ message: "Select a valid maintenance status." }),
  }),
  lastMaintenanceDate: z.date().optional(),
  predictiveMaintenanceRequired: z.boolean(),
  scheduledDate: z
    .date()
    .min(new Date(), "Scheduled date must be in the future."),
  maintenanceType: z.string().min(1, "Maintenance Type is required."),
  status: z.nativeEnum(TaskStatus, {
    errorMap: () => ({ message: "Select a valid task status." }),
  }),
  createdAt: z.date().default(() => new Date()),
});

type FormValues = z.infer<typeof FormSchema>;

const CreateMachineryForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      machineId: "",
      type: "",
      maintenanceStatus: MaintenanceStatus.OPERATIONAL,
      lastMaintenanceDate: undefined,
      predictiveMaintenanceRequired: false,
      scheduledDate: new Date(),
      maintenanceType: "",
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form data submitted:", data);
  };

  return (
    <div className="flex flex-col items-center justify-start mt-20 w-full min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Create Machinery Record
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          <FormField
            control={form.control}
            name="machineId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Machine ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Machine ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maintenanceStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maintenance Status</FormLabel>
                <FormControl>
                  <select
                    className="w-full p-2 border rounded"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {Object.values(MaintenanceStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastMaintenanceDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Maintenance Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="predictiveMaintenanceRequired"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Predictive Maintenance Required</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduledDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scheduled Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maintenanceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maintenance Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Maintenance Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    className="w-full p-2 border rounded"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {Object.values(TaskStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Record"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateMachineryForm;
