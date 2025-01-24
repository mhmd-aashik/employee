/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
// import { Button } from "./ui/button";

interface EmployeesCardProps {
  id: string;
  name: string;
  position: string;
  skillset: string;
  availablestatus?: boolean;
}

const EmployeesCard = ({
  id,
  name,
  position,
  skillset,
  availablestatus,
}: EmployeesCardProps) => {
  const editPath = JSON.parse(id);
  // const pathName = usePathname();
  console.log(editPath, "from card");

  // async function handleDeleteEmployee() {
  //   // try {
  //   //   await deleteUser({
  //   //     id,
  //   //     path: pathName,
  //   //   });
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  // }
  return (
    <Link
      href={`employee-data/${editPath}`}
      className="w-80 h-64 mx-auto rounded-xl shadow-lg overflow-hidden border border-gray-300 hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      <div className="p-6 h-full flex flex-col justify-between">
        {/* Profile Image and Info */}
        <div className="flex items-center space-x-6 mb-4">
          <img
            src="https://cdn4.iconfinder.com/data/icons/job-resume-9/100/job_work_office-15-512.png"
            alt="profile"
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-200 uppercase tracking-wide">
              {position}
            </p>
          </div>
        </div>

        {/* Card Details */}
        <div className="text-white">
          <p className="text-base">
            <span className="font-semibold">Skills:</span> {skillset}
          </p>
          <p
            className={`mt-4 text-base font-bold ${
              availablestatus ? "text-green-400" : "text-red-400"
            }`}
          >
            {availablestatus ? "Currently Available" : "Not Available"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EmployeesCard;
