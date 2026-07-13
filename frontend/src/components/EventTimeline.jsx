import { useQueue } from "../context/QueueContext";

const MAX_EVENTS = 50;

const getBadgeColor = (event) => {
  switch (event) {
    case "JOB_CREATED":
      return "bg-blue-500";

    case "JOB_CLAIMED":
      return "bg-yellow-500";

    case "JOB_COMPLETED":
      return "bg-green-500";

    case "JOB_RETRY":
      return "bg-orange-500";

    case "JOB_DEAD_LETTER":
      return "bg-red-500";

    case "JOB_RECOVERED":
      return "bg-purple-500";

    default:
      return "bg-gray-500";
  }
};

const EventTimeline = () => {
  const { events } = useQueue();
  console.log("Timeline Length:", events.length);
  

  return (
    
    <div className="mx-8 mt-8 rounded-xl border border-slate-700 bg-slate-900">

      <div className="border-b border-slate-700 p-5">
        <h2 className="text-xl font-semibold text-white">
          Live Queue Events
        </h2>
      </div>

      <div className="max-h-[450px] overflow-y-auto">

        {events.length === 0 ? (
          <p className="p-6 text-center text-slate-400">
            Waiting for events...
          </p>
        ) : (
          events.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-slate-800 px-5 py-4"
            >
              <div className="flex items-center gap-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${getBadgeColor(
                    item.event
                  )}`}
                >
                  {item.event.replaceAll("_", " ")}
                </span>

                <span className="text-white">
                  {item.data?.id?.slice(0, 12)}...
                </span>

              </div>

              <span className="text-sm text-slate-400">
                {item.time}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default EventTimeline;