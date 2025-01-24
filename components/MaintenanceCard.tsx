import Link from "next/link";

type MaintenanceCardProps = {
  _id: string;
  name: string;
  type: string;
  maintenanceStatus: string;
  lastMaintenanceDate: string;
  predictiveMaintenanceRequired: boolean;
  scheduledDate: string;
  maintenanceType: string;
  status: string;
};

const MaintenanceCard = ({
  _id,
  name,
  type,
  maintenanceStatus,
  lastMaintenanceDate,
  predictiveMaintenanceRequired,
  scheduledDate,
  maintenanceType,
  status,
}: MaintenanceCardProps) => {
  // Ensure date fields are formatted as strings
  const formattedLastMaintenanceDate = new Date(
    lastMaintenanceDate
  ).toLocaleDateString();
  const formattedScheduledDate = new Date(scheduledDate).toLocaleDateString();

  console.log(
    {
      name,
      type,
      maintenanceStatus,
      lastMaintenanceDate: formattedLastMaintenanceDate,
      predictiveMaintenanceRequired,
      scheduledDate: formattedScheduledDate,
      maintenanceType,
      status,
    },
    "from maintenance card"
  );

  return (
    <Link
      href={`machines/${_id}`}
      className="max-w-md mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-700"
    >
      <div className="px-8 py-6">
        <h2 className="text-2xl font-extrabold text-white tracking-wide mb-6 uppercase">
          Agency Maintenance Card
        </h2>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase font-semibold">Name:</p>
          <p className="text-lg text-white">{name}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase font-semibold">Type:</p>
          <p className="text-lg text-white">{type}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase font-semibold">
            Maintenance Status:
          </p>
          <p className="text-lg text-white">{maintenanceStatus}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase font-semibold">
            Last Maintenance Date:
          </p>
          <p className="text-lg text-white">{formattedLastMaintenanceDate}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase font-semibold">
            Predictive Maintenance Required:
          </p>
          <p className="text-lg text-white">
            {predictiveMaintenanceRequired ? "Yes" : "No"}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase font-semibold">
            Scheduled Date:
          </p>
          <p className="text-lg text-white">{formattedScheduledDate}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase font-semibold">
            Maintenance Type:
          </p>
          <p className="text-lg text-white">{maintenanceType}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 uppercase font-semibold">
            Status:
          </p>
          <p className="text-lg text-white">{status}</p>
        </div>
      </div>
    </Link>
  );
};

export default MaintenanceCard;
