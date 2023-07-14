/*
  Warnings:

  - Added the required column `messageId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accepted` to the `GameHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "messageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GameHistory" ADD COLUMN     "accepted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "receiverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_receiverId_fkey" FOREIGN KEY ("senderId", "receiverId") REFERENCES "Chat"("senderId", "receiverId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
