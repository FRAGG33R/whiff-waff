-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('CHALLENGE', 'TIME');

-- CreateEnum
CREATE TYPE "Map" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "nick_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userPlays" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_nick_name_key" ON "user"("nick_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_userPlays_AB_unique" ON "_userPlays"("A", "B");

-- CreateIndex
CREATE INDEX "_userPlays_B_index" ON "_userPlays"("B");

-- AddForeignKey
ALTER TABLE "_userPlays" ADD CONSTRAINT "_userPlays_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userPlays" ADD CONSTRAINT "_userPlays_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
