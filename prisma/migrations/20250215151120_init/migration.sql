-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dob" BIGINT,
    "dod" BIGINT,
    "createdAt" BIGINT,
    "updatedAt" BIGINT,
    "avatar" TEXT,
    "images" TEXT[],
    "gender" TEXT,
    "bio" TEXT,
    "job" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" SERIAL NOT NULL,
    "userId1" TEXT,
    "userId2" TEXT,
    "childrenIds" TEXT[],
    "status" TEXT,
    "createdAt" BIGINT,
    "updatedAt" BIGINT,
    "rank" INTEGER,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Relationship_id_key" ON "Relationship"("id");

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
