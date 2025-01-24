"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { createMachinary } from "@/lib/actions/machinary.action";
import { usePathname, useRouter } from "next/navigation";

enum MaintenanceStatus {
  OPERATIONAL = "OPERATIONAL",
  UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
  REPAIR_NEEDED = "REPAIR_NEEDED",
}

enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

const FormSchema = z.object({
  name: z.string().min(1, "Name must not be empty").optional(),
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
});

const CreateMachine = () => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: "",
      maintenanceStatus: MaintenanceStatus.OPERATIONAL,
      lastMaintenanceDate: new Date(),
      predictiveMaintenanceRequired: false,
      scheduledDate: new Date(),
      maintenanceType: "",
      status: TaskStatus.PENDING,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createMachinary({
        name: data.name!,
        type: data.type!,
        maintenanceStatus: data.maintenanceStatus!,
        lastMaintenanceDate: data.lastMaintenanceDate!,
        predictiveMaintenanceRequired: data.predictiveMaintenanceRequired!,
        maintenanceType: data.maintenanceType!,
        scheduledDate: data.scheduledDate!,
        status: data.status!,
        path: pathname,
      });

      console.log("Form data submitted:", data);

      console.log("Form data submitted:", data);

      form.reset();
      router.push("/employees");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start mt-20 w-full min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Create Machinary
      </h1>
      <Form {...form}>
        <form
          suppressHydrationWarning
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type Field */}

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Type</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Maintenance Status Field */}

          <FormField
            control={form.control}
            name="maintenanceStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Maintenance Status
                </FormLabel>
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

          {/* Last Maintenance Date Field */}

          <FormField
            control={form.control}
            name="lastMaintenanceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg font-semibold">
                  Start Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-[240px] pl-3 text-left font-normal bg-white border-gray-300 rounded-lg shadow-sm hover:ring-indigo-500"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      className="bg-white border border-gray-200 rounded-lg shadow-md"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Predictive Maintenance Required Field */}
          <FormField
            control={form.control}
            name="predictiveMaintenanceRequired"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-4 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-lg font-semibold">
                  Predictive Maintenance Required
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Scheduled Date Field */}
          <FormField
            control={form.control}
            name="scheduledDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg font-semibold">
                  Scheduled Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-[240px] pl-3 text-left font-normal bg-white border-gray-300 rounded-lg shadow-sm hover:ring-indigo-500"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      className="bg-white border border-gray-200 rounded-lg shadow-md"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Maintenance Type Field */}
          <FormField
            control={form.control}
            name="maintenanceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Maintenance Type
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Maintenance Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Maintenance Type Field */}
          <FormField
            control={form.control}
            name="maintenanceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Maintenance Type
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Maintenance Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Field */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Status</FormLabel>
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Employee"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateMachine;
