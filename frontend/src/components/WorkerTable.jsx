import { useQueue } from "../context/QueueContext";

const WorkerTable = () => {

    const { workers } = useQueue();
    console.log(workers)

    return (

        <div className="mx-8 mt-8 rounded-xl border border-slate-700 bg-slate-900">

            <div className="border-b border-slate-700 p-5">

                <h2 className="text-xl font-semibold text-white">
                    Workers
                </h2>

            </div>

            <table className="w-full">

                <thead>

                    <tr className="border-b border-slate-700 text-slate-300">

                        <th className="px-5 py-4 text-left">
                            Worker
                        </th>

                        <th className="px-5 py-4 text-left">
                            Status
                        </th>

                        <th className="px-5 py-4 text-left">
                            Started
                        </th>

                        <th className="px-5 py-4 text-left">
                            Heartbeat
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {workers.map(worker => (

                        <tr
                            key={worker.id}
                            className="border-b border-slate-800 hover:bg-slate-800"
                        >

                            <td className="px-5 py-4 text-white">
                                {worker.name}
                            </td>

                            <td className="px-5 py-4">

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                                        worker.status === "ONLINE"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    {worker.status}
                                </span>

                            </td>

                            <td className="px-5 py-4 text-slate-400">
                                {new Date(worker.startedAt).toLocaleString("en-IN")}
                            </td>

                            <td className="px-5 py-4 text-slate-400">
                                {new Date(worker.lastHeartbeat).toLocaleString("en-IN")}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default WorkerTable;