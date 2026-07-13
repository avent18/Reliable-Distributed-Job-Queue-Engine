import { getDependentJobs } from "../../repositories/job.repository.js";

const hasCycleDFS = async (
    current,
    target,
    visited = new Set()
) => {

    if (current === target) {
        return true;
    }

    if (visited.has(current)) {
        return false;
    }

    visited.add(current);

    const neighbours = await getDependentJobs(current);

    for (const neighbour of neighbours) {

        const cycle = await hasCycleDFS(
            neighbour.dependsOnJobId,
            target,
            visited
        );

        if (cycle) {
            return true;
        }

    }

    return false;

};

export const validateDependency = async (
    jobId,
    dependsOnJobId
) => {

    return !(await hasCycleDFS(
        dependsOnJobId,
        jobId
    ));

};