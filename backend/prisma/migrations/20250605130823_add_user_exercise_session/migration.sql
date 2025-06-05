-- CreateTable
CREATE TABLE "UserExerciseSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,

    CONSTRAINT "UserExerciseSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExerciseSession_userId_sessionId_exerciseId_key" ON "UserExerciseSession"("userId", "sessionId", "exerciseId");

-- AddForeignKey
ALTER TABLE "UserExerciseSession" ADD CONSTRAINT "UserExerciseSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseSession" ADD CONSTRAINT "UserExerciseSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseSession" ADD CONSTRAINT "UserExerciseSession_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
