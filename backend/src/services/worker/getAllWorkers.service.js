import { getAllWorkers } from "../../repositories/worker.repository.js";

export const getAllWorkersService = async () => {
    return await getAllWorkers();
};