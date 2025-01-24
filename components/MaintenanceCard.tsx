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
      className="max-w-md w-full mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-700 transition-transform duration-300 hover:scale-105"
    >
      <div className="px-6 py-4 sm:px-8 sm:py-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide mb-4 sm:mb-6 uppercase text-center">
          Agency Maintenance Card
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm sm:text-base text-gray-400 uppercase font-semibold">
              Name:
            </p>
            <p className="text-lg sm:text-xl text-white">{name}</p>
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-400 uppercase font-semibold">
              Type:
            </p>
            <p className="text-lg sm:text-xl text-white">{type}</p>
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-400 uppercase font-semibold">
              Maintenance Status:
            </p>
            <p className="text-lg sm:text-xl text-white">{maintenanceStatus}</p>
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-400 uppercase font-semibold">
              Last Maintenance Date:
            </p>
            <p className="text-lg sm:text-xl text-white">
              {formattedLastMaintenanceDate}
            </p>
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-400 uppercase font-semibold">
              Predictive Maintenance Required:
            </p>
            <p className="text-lg sm:text-xl text-white">
              {predictiveMaintenanceRequired ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-400 uppercase font-semibold">
              Scheduled Date:
            </p>
            <p className="text-lg sm:text-xl text-white">
              {formattedScheduledDate}
            </p>
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-400 uppercase font-semibold">
              Maintenance Type:
            </p>
            <p className="text-lg sm:text-xl text-white">{maintenanceType}</p>
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-400 uppercase font-semibold">
              Status:
            </p>
            <p className="text-lg sm:text-xl text-white">{status}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MaintenanceCard;
