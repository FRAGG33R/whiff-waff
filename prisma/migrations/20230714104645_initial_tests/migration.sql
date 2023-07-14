/*
  Warnings:

  - You are about to drop the `_userPlays` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BANNED', 'MUTED');

-- CreateEnum
CREATE TYPE "ChatRoomType" AS ENUM ('PRIVATE', 'PUBLIC', 'PROTECTED');

-- DropForeignKey
ALTER TABLE "_userPlays" DROP CONSTRAINT "_userPlays_A_fkey";

-- DropForeignKey
ALTER TABLE "_userPlays" DROP CONSTRAINT "_userPlays_B_fkey";

-- DropIndex
DROP INDEX "user_id_key";

-- DropTable
DROP TABLE "_userPlays";

-- CreateTable
CREATE TABLE "Chat" (
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("senderId","receiverId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "roomChatId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomChat" (
    "id" TEXT NOT NULL,
    "type" "ChatRoomType" NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,

    CONSTRAINT "RoomChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasRole" (
    "role" "Role" NOT NULL,
    "roomChatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HasRole_pkey" PRIMARY KEY ("roomChatId","userId")
);

-- CreateTable
CREATE TABLE "Join" (
    "roomChatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Join_pkey" PRIMARY KEY ("roomChatId","userId")
);

-- CreateTable
CREATE TABLE "Play" (
    "gameMode" "Mode" NOT NULL,
    "gameMap" "Map" NOT NULL,
    "rightUserId" TEXT NOT NULL,
    "leftUserId" TEXT NOT NULL,

    CONSTRAINT "Play_pkey" PRIMARY KEY ("leftUserId","rightUserId")
);

-- CreateTable
CREATE TABLE "GameHistory" (
    "id" TEXT NOT NULL,
    "leftUserId" TEXT NOT NULL,
    "RightUserId" TEXT NOT NULL,
    "scoreLeft" INTEGER NOT NULL,
    "scoreRight" INTEGER NOT NULL,

    CONSTRAINT "GameHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HasRole_roomChatId_key" ON "HasRole"("roomChatId");

-- CreateIndex
CREATE UNIQUE INDEX "HasRole_userId_key" ON "HasRole"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GameHistory_leftUserId_RightUserId_key" ON "GameHistory"("leftUserId", "RightUserId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomChatId_senderId_fkey" FOREIGN KEY ("roomChatId", "senderId") REFERENCES "Join"("roomChatId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasRole" ADD CONSTRAINT "HasRole_roomChatId_fkey" FOREIGN KEY ("roomChatId") REFERENCES "RoomChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasRole" ADD CONSTRAINT "HasRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Join" ADD CONSTRAINT "Join_roomChatId_fkey" FOREIGN KEY ("roomChatId") REFERENCES "RoomChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Join" ADD CONSTRAINT "Join_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_leftUserId_fkey" FOREIGN KEY ("leftUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_rightUserId_fkey" FOREIGN KEY ("rightUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHistory" ADD CONSTRAINT "GameHistory_leftUserId_RightUserId_fkey" FOREIGN KEY ("leftUserId", "RightUserId") REFERENCES "Play"("leftUserId", "rightUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
