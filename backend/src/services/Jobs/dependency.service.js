import { addDependency, getIncompleteDependencies } from "../../repositories/job.repository.js"



export const dependenciesSatisfied = async(jobId)=>{
  const dependencies = await getIncompleteDependencies(jobId);
  return dependencies.length === 0;
}


export const addDependencyService = async(jobId, dependsOnJobId)=>{
  const valid = await validateDependency(
    jobId,
    dependsOnJobId
);

if (!valid) {
    throw new ApiError(
        400,
        "Circular dependency detected"
    );
}
if (jobId === dependsOnJobId) {
    throw new ApiError(
        400,
        "A job cannot depend on itself"
    );
}

await addDependency(
    jobId,
    dependsOnJobId
);
}