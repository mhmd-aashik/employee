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
      className="max-w-lg mx-auto rounded-xl shadow-xl overflow-hidden border border-gray-300 hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
    >
      <div className="p-8">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src="https://cdn4.iconfinder.com/data/icons/job-resume-9/100/job_work_office-15-512.png"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />

          <div>
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-200 uppercase tracking-wider">
              {position}
            </p>
          </div>
        </div>

        <div className="text-white">
          <p className="text-lg">
            <span className="font-semibold">Skills:</span> {skillset}
          </p>
          <p
            className={`mt-4 text-lg font-bold ${
              availablestatus ? "text-green-300" : "text-red-300"
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
