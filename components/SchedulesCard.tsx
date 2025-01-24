import React from "react";

const SchedulesCard = ({
  // _id,
  scheduledStartTime,
  // scheduledDate,
}: {
  _id: string;
  scheduledStartTime: string;
  scheduledDate: Date;
}) => {
  return (
    <div>
      {/* <h1>{_id}</h1> */}
      <h1> {scheduledStartTime.toString()}</h1>
      {/* <h1> {scheduledDate}</h1> */}
    </div>
  );
};

export default SchedulesCard;
