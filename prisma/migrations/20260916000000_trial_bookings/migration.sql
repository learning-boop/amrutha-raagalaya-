-- CreateTable
CREATE TABLE "TrialSlot" (
    "id" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL DEFAULT 30,
    "mode" TEXT NOT NULL,
    "meetingLink" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrialSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrialBooking" (
    "id" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "childAge" INTEGER NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decidedAt" TIMESTAMP(3),

    CONSTRAINT "TrialBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrialSlot_startsAt_idx" ON "TrialSlot"("startsAt");

-- CreateIndex
CREATE INDEX "TrialBooking_slotId_status_idx" ON "TrialBooking"("slotId", "status");

-- CreateIndex
CREATE INDEX "TrialBooking_status_createdAt_idx" ON "TrialBooking"("status", "createdAt");

-- CreateIndex
CREATE INDEX "TrialBooking_phone_status_idx" ON "TrialBooking"("phone", "status");

-- AddForeignKey
ALTER TABLE "TrialBooking" ADD CONSTRAINT "TrialBooking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "TrialSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
