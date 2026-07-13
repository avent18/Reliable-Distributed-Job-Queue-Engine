import { registerWorker } from "../../repositories/worker.repository.js";
import { emitWorkerRegistered } from "../../events/queueEvents.js";


export const registerWorkerService = async(workername)=>{
    const worker = await registerWorker(workername);

await emitWorkerRegistered(worker);

return worker;
}