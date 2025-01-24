"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { usePathname, useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions/employee.action";

// import { createEmployee } from "@/lib/actions/employee.action";

const FormSchema = z.object({
  name: z.string().min(1, "Name must not be empty").optional(), // Non-empty string if provided
  position: z.string().min(1, "Position must not be empty").optional(), // Non-empty string if provided
  skillset: z
    .string()
    .min(1, "Skillset must not be empty")
    .regex(
      /^[a-zA-Z0-9, ]*$/,
      "Skillset must contain only letters, numbers, commas, and spaces"
    )
    .optional(), // Validate format if provided
  availablestatus: z.boolean().optional(), // Must be a boolean value
  scheduledStartTime: z.date().optional(), // Valid Date if provided
  scheduledEndTime: z.date().optional(),
  taskDescription: z
    .string()
    .min(10, "Task description must be at least 10 characters")
    .optional(),
  skillRequired: z
    .string()
    .min(1, "Skill required must not be empty")
    .regex(
      /^[a-zA-Z0-9, ]*$/,
      "Skill required must contain only letters, numbers, commas, and spaces"
    )
    .optional(),
  status: z
    .string()
    .refine(
      (value) => ["Pending", "In Progress", "Completed"].includes(value),
      {
        message: "Status must be 'Pending', 'In Progress', or 'Completed'",
      }
    )
    .optional(),
  scheduledDate: z.date().optional(), // Must be a valid Date
  dueDate: z.date(),
});

const CreateEmployee = () => {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      position: "",
      skillset: "",
      availablestatus: false,
      scheduledStartTime: new Date(),
      scheduledEndTime: new Date(),
      taskDescription: "",
      skillRequired: "",
      status: "",
      scheduledDate: new Date(),
      dueDate: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createEmployee({
        name: data.name,
        position: data.position!,
        skillset: data.skillset!,
        availablestatus: data.availablestatus!,
        scheduledStartTime: data.scheduledStartTime!,
        scheduledEndTime: data.scheduledEndTime!,
        taskDescription: data.taskDescription!,
        skillRequired: data.skillRequired!,
        status: data.status!,
        scheduledDate: data.scheduledDate!,
        dueDate: data.dueDate!,
        path: pathname,
      });

      console.log(data, "from client");

      form.reset();
      router.push("/employees");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start mt-20 w-full min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Create Employee
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

          {/* Position Field */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Position
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Position"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Skill Set Field */}
          <FormField
            control={form.control}
            name="skillset"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Skill Set
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Skill Set"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Availability Status */}
          <FormField
            control={form.control}
            name="availablestatus"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-4 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-lg font-semibold">
                  Availability Status
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Scheduled Start Time */}
          <FormField
            control={form.control}
            name="scheduledStartTime"
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

          {/* Scheduled End Time */}
          <FormField
            control={form.control}
            name="scheduledEndTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg font-semibold">
                  End Date
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
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-sm text-gray-500">
                  Select the scheduled end date.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Task Description */}
          <FormField
            control={form.control}
            name="taskDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Task Description
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Task Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Skill Required */}
          <FormField
            control={form.control}
            name="skillRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Skill Required
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Required Skills"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Status</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Status"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Scheduled Date */}
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
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-sm text-gray-500">
                  Select a scheduled date.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Due Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg font-semibold">
                  Due Date
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
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-sm text-gray-500">
                  Select the due date.
                </FormDescription>
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

export default CreateEmployee;
