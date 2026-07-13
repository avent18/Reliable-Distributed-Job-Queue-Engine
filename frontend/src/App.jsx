import JobTable from "./components/JobTable"
import Navbar from "./components/Navbar"
import QueueStats from "./components/QueueStats"
import { useEffect } from "react";
import socket from "./services/socket";
import { useQueue } from "./context/QueueContext";
import WorkerTable from "./components/WorkerTable";
import EventTimeline from "./components/EventTimeline";


function App() {
  const { fetchJobs, fetchStats, setEvents  } = useQueue();
  useEffect(() => {
  const handleMessage = (event) => {
    const payload = JSON.parse(event.data);

    setEvents((prev) => {
    console.log("PREV LENGTH:", prev.length);

    return [
      {
        ...payload,
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 49),
    ];
  });

    switch (payload.event) {
      case "JOB_CREATED":
      case "JOB_CLAIMED":
      case "JOB_COMPLETED":
      case "JOB_RETRY":
      case "JOB_DEAD_LETTER":
      case "JOB_RECOVERED":
        fetchJobs();
        fetchStats();
        break;
    }
  };

  socket.addEventListener("message", handleMessage);

  return () => {
    socket.removeEventListener("message", handleMessage);
  };
}, []);

  
  return (
    <>
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <QueueStats />
      <JobTable />
      <WorkerTable />
      <EventTimeline />
    </div>
    </>
  )
  
}

export default App
