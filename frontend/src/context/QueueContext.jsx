import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
    deadLetter: 0,
    workers: 0,
  });
  const [workers, setWorkers] = useState([]);
  const [events, setEvents] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs/getall");
      setJobs(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/queue/stats");
      setStats(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStats(false);
    }
  };



  const fetchWorkers = async () => {
  try {
    const response = await api.get("/worker/getworkers");

    setWorkers(response.data.data);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
    fetchJobs();
    fetchStats();
    fetchWorkers();
}, []);

  return (
    <QueueContext.Provider
      value={{
        jobs,
        stats,
        workers,
fetchWorkers,
events,
setEvents,
        loadingJobs,
        loadingStats,
        fetchJobs,
        fetchStats,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);