import { useQueue } from "../context/QueueContext";


const QueueStats = () => {
 const { stats, loadingStats } = useQueue();

if (loadingStats) {
  return (
    <div className="p-8 text-center text-white">
      Loading Queue Stats...
    </div>
  );
}


  return (
    <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-xl border border-blue-500 bg-slate-900 p-6">
    <p className="text-slate-400">
      Pending
    </p>

    <h2 className="mt-4 text-4xl font-bold text-blue-400">
      {stats.pending}
    </h2>
  </div>

  <div className="rounded-xl border border-yellow-500 bg-slate-900 p-6">
    <p className="text-slate-400">
      Processing
    </p>

    <h2 className="mt-4 text-4xl font-bold text-yellow-400">
      {stats.processing}
    </h2>
  </div>

  <div className="rounded-xl border border-green-500 bg-slate-900 p-6">
    <p className="text-slate-400">
      Completed
    </p>

    <h2 className="mt-4 text-4xl font-bold text-green-400">
      {stats.completed}
    </h2>
  </div>

  <div className="rounded-xl border border-red-500 bg-slate-900 p-6">
    <p className="text-slate-400">
      Dead Letter
    </p>

    <h2 className="mt-4 text-4xl font-bold text-red-400">
      {stats.deadLetter}
    </h2>
  </div>

  <div className="rounded-xl border border-orange-500 bg-slate-900 p-6">
    <p className="text-slate-400">
     Failed
    </p>

    <h2 className="mt-4 text-4xl font-bold text-orange-400">
      {stats.failed}
    </h2>
  </div>

  <div className="rounded-xl border border-purple-500 bg-slate-900 p-6">
    <p className="text-slate-400">
        Workers
    </p>

    <h2 className="mt-4 text-4xl font-bold text-purple-400">
        {stats.workers}
    </h2>
</div>

</div>
  );
};

export default QueueStats;