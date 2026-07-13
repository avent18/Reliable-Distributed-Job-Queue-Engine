import prisma from "../config/prisma.js"

export const createJob = async (data) => {
    return prisma.job.create({
        data
    });
};

export const completeJob = async (jobId) => {
    return prisma.$transaction(async (tx) => {

       const updatedJob =  await tx.job.update({
            where: {
                id: jobId
            },
            data: {
                status: "COMPLETED",
                completedAt: new Date()
            }
        });

        await tx.jobLease.delete({
            where: {
                jobId
            }
        });
       return updatedJob;
    });
};

export const retryJob = async (jobId, attempts, delay) => {
    return prisma.$transaction(async (tx) => {

        const updatedJob = await tx.job.update({
            where: {
                id: jobId
            },
            data: {
                attempts,
                status: "PENDING",
                availableAt: new Date(Date.now() + delay)
            }
        });

        await tx.jobLease.delete({
            where: {
                jobId
            }
        });
     return updatedJob;
    });
};


export const getIncompleteDependencies = async(jobId)=>{
 return prisma.jobDependency.findMany({
  where:{
    jobId,
    dependsOn:{
      status:{
        not:"COMPLETED"
      }
    }
  },
  include:{
    dependsOn:true
  }
 })
}


export const releaseJobForlater = async(jobId)=>{
 return await prisma.$transaction(async(tx)=>{
  await tx.job.update({
    where:{
      id:jobId
    },
    data:{
      status:"PENDING"
    }
  });

  await tx.jobLease.delete({
    where:{
      jobId
    }
  })
 })
}


export const addDependency = async(jobId, dependsOnJobId)=>{
  return await prisma.jobDependency.create({
    data:{
      jobId,
      jobDependency
    }
  })
}


export const getDependentJobs = async(jobId)=>{
  return await  prisma.jobDependency.findMany({
    where:{
      jobId
    },
    select:{  //fetching only jobid not need to load all job info
      dependsOnJobId:true
    }
  })
}

export const getAllJobs = async () => {
    return await prisma.job.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};