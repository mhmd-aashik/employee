/* eslint-disable @next/next/no-img-element */
import DeleteBtn from "@/components/DeleteBtn";
import { Button } from "@/components/ui/button";
import { getEmployeeById } from "@/lib/actions/employee.action";
import Link from "next/link";
import React from "react";

const SigleCard = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const getSingleData = await getEmployeeById(id);

  const {
    name,
    position,
    skillset,
    availablestatus,
    scheduledStartTime,
    scheduledEndTime,
    taskDescription,
    skillRequired,
    status,
    scheduledDate,
    dueDate,
    createdAt,
  } = getSingleData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Welcome to Your Agency Dashboard
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <img
              src="https://cdn4.iconfinder.com/data/icons/job-resume-9/100/job_work_office-15-512.png"
              alt="profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-blue-500"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {name || "Unnamed Task"}
              </h1>
              {position && (
                <p className="text-base sm:text-lg text-blue-600 font-medium">
                  {position}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 sm:space-x-4 mt-4 sm:mt-0">
            <Link href={`/edit-emploee/${id}`}>
              <Button className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                Edit
              </Button>
            </Link>
            <DeleteBtn id={id} />
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-4">
            Task Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {skillset && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Skillset</p>
                <p className="text-base sm:text-lg text-gray-800">{skillset}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Availability Status
              </p>
              <p
                className={`text-base sm:text-lg font-semibold ${
                  availablestatus ? "text-green-600" : "text-red-600"
                }`}
              >
                {availablestatus ? "Available" : "Not Available"}
              </p>
            </div>
            {scheduledStartTime && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Scheduled Start Time
                </p>
                <p className="text-base sm:text-lg text-gray-800">
                  {new Date(scheduledStartTime).toLocaleString()}
                </p>
              </div>
            )}
            {scheduledEndTime && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Scheduled End Time
                </p>
                <p className="text-base sm:text-lg text-gray-800">
                  {new Date(scheduledEndTime).toLocaleString()}
                </p>
              </div>
            )}
            {scheduledDate && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Scheduled Date
                </p>
                <p className="text-base sm:text-lg text-gray-800">
                  {new Date(scheduledDate).toLocaleDateString()}
                </p>
              </div>
            )}
            {dueDate && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Due Date</p>
                <p className="text-base sm:text-lg text-gray-800">
                  {new Date(dueDate).toLocaleDateString()}
                </p>
              </div>
            )}
            {createdAt && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Created At
                </p>
                <p className="text-base sm:text-lg text-gray-800">
                  {new Date(createdAt).toLocaleString()}
                </p>
              </div>
            )}
            {status && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Status</p>
                <p className="text-base sm:text-lg text-gray-800">{status}</p>
              </div>
            )}
            {skillRequired && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Skill Required
                </p>
                <p className="text-base sm:text-lg text-gray-800">
                  {skillRequired}
                </p>
              </div>
            )}
          </div>

          {taskDescription && (
            <div className="mt-6 sm:mt-8">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">
                Task Description
              </h2>
              <p className="mt-2 sm:mt-4 text-gray-700 text-base sm:text-lg">
                {taskDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigleCard;
