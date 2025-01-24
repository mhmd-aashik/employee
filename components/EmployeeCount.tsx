import Image from "next/image";
import Link from "next/link";
import React from "react";

interface EmployeeCountProps {
  countData: number;
  name: string;
  title: string;
  link: string;
}

const EmployeeCount = ({
  name,
  title,
  countData,
  link,
}: EmployeeCountProps) => {
  return (
    <Link
      href={link}
      className="aspect-video bg-gradient-to-r from-blue-300 to-orange-300 hover:bg-gradient-to-r hover:from-blue-200 hover:to-orange-200 rounded-xl bg-muted/50"
    >
      <div className="border border-t bg-gradient-to-br from-[#394F68] to-[#183B7E] p-3 rounded-t-xl" />

      <div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <div className="text-2xl font-bold">{name}</div>
              <div className="text-sm">{title}</div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-10">
              <Image
                src="https://media.istockphoto.com/id/871461336/vector/icon-for-business-management-recruitment-of-employees-team-work.jpg?s=612x612&w=0&k=20&c=FRna_epaMZsMGJN8ubve0pvEStVWQNzIyMy0lla91Ow="
                alt="Employee"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="text-4xl font-bold text-center">
            {countData ? `${countData} ${name}` : `${0} ${name}`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EmployeeCount;
