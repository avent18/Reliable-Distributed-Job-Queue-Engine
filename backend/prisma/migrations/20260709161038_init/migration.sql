-- CreateEnum
CREATE TYPE "public"."JobStatus" AS ENUM ('PENDING', 'SCHEDULED', 'PROCESSING', 'COMPLETED', 'FAILED', 'DEAD_LETTER');

-- CreateEnum
CREATE TYPE "public"."JobPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."WorkerStatus" AS ENUM ('ONLINE', 'BUSY', 'OFFLINE');

-- CreateTable
CREATE TABLE "public"."Job" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "public"."JobStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "public"."JobPriority" NOT NULL DEFAULT 'MEDIUM',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "scheduledAt" TIMESTAMP(3),
    "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextRetryAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Worker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "public"."WorkerStatus" NOT NULL DEFAULT 'ONLINE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastHeartbeat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobLease" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "lockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leasedUntil" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobLease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DeadLetterJob" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "failureReason" TEXT NOT NULL,
    "failureStack" TEXT,
    "failedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replayedAt" TIMESTAMP(3),

    CONSTRAINT "DeadLetterJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProcessedJob" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "resultHash" TEXT,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobDependency" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "dependsOnJobId" TEXT NOT NULL,

    CONSTRAINT "JobDependency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Job_status_priority_availableAt_idx" ON "public"."Job"("status", "priority", "availableAt");

-- CreateIndex
CREATE INDEX "Job_scheduledAt_idx" ON "public"."Job"("scheduledAt");

-- CreateIndex
CREATE INDEX "Job_createdAt_idx" ON "public"."Job"("createdAt");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "public"."Job"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_name_key" ON "public"."Worker"("name");

-- CreateIndex
CREATE INDEX "Worker_status_idx" ON "public"."Worker"("status");

-- CreateIndex
CREATE INDEX "Worker_lastHeartbeat_idx" ON "public"."Worker"("lastHeartbeat");

-- CreateIndex
CREATE UNIQUE INDEX "JobLease_jobId_key" ON "public"."JobLease"("jobId");

-- CreateIndex
CREATE INDEX "JobLease_leasedUntil_idx" ON "public"."JobLease"("leasedUntil");

-- CreateIndex
CREATE INDEX "JobLease_workerId_idx" ON "public"."JobLease"("workerId");

-- CreateIndex
CREATE UNIQUE INDEX "DeadLetterJob_jobId_key" ON "public"."DeadLetterJob"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedJob_jobId_key" ON "public"."ProcessedJob"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedJob_idempotencyKey_key" ON "public"."ProcessedJob"("idempotencyKey");

-- CreateIndex
CREATE INDEX "ProcessedJob_idempotencyKey_idx" ON "public"."ProcessedJob"("idempotencyKey");

-- CreateIndex
CREATE INDEX "JobDependency_jobId_idx" ON "public"."JobDependency"("jobId");

-- CreateIndex
CREATE INDEX "JobDependency_dependsOnJobId_idx" ON "public"."JobDependency"("dependsOnJobId");

-- CreateIndex
CREATE UNIQUE INDEX "JobDependency_jobId_dependsOnJobId_key" ON "public"."JobDependency"("jobId", "dependsOnJobId");

-- AddForeignKey
ALTER TABLE "public"."JobLease" ADD CONSTRAINT "JobLease_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobLease" ADD CONSTRAINT "JobLease_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "public"."Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeadLetterJob" ADD CONSTRAINT "DeadLetterJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProcessedJob" ADD CONSTRAINT "ProcessedJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobDependency" ADD CONSTRAINT "JobDependency_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobDependency" ADD CONSTRAINT "JobDependency_dependsOnJobId_fkey" FOREIGN KEY ("dependsOnJobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
