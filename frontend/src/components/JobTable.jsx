import { useQueue } from "../context/QueueContext";

const getStatusColor = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500";
    case "PROCESSING":
      return "bg-yellow-500";
    case "PENDING":
      return "bg-blue-500";
    case "DEAD_LETTER":
      return "bg-red-500";
    case "FAILED":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};

const JobTable = () => {
  const { jobs, loadingJobs } = useQueue();

  if (loadingJobs) {
    return (
      <div className="mx-8 mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-center text-white">
          Loading Jobs...
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-8 mt-8 rounded-xl border border-slate-700 bg-slate-900">
      <div className="border-b border-slate-700 p-5">
        <h2 className="text-xl font-semibold text-white">Recent Jobs</h2>
      </div>


      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700 text-slate-300">
            <th className="px-5 py-4 text-left">Job ID</th>
            <th className="px-5 py-4 text-left">Type</th>
            <th className="px-5 py-4 text-left">Priority</th>
            <th className="px-5 py-4 text-left">Status</th>
            <th className="px-5 py-4 text-left">Attempts</th>
            <th className="px-5 py-4 text-left">Created</th>
          </tr>
        </thead>

        <tbody>

          
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="border-b border-slate-800 hover:bg-slate-800">
              <td className="px-5 py-4 text-sm text-slate-300">
                {job.id.substring(0,15)}......
              </td>

              <td className="px-5 py-4 text-white">{job.type}</td>

              <td className="px-5 py-4 text-white">{job.priority}</td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusColor(
                    job.status,
                  )}`}>
                  {job.status}
                </span>
              </td>

              <td className="px-5 py-4 text-white">{job.attempts}</td>

              <td className="px-5 py-4 text-slate-400">{new Date(job.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
