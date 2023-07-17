-- CreateEnum
CREATE TYPE "mode" AS ENUM ('CHALLENGE', 'TIME');

-- CreateEnum
CREATE TYPE "map" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'BANNED', 'MUTED');

-- CreateEnum
CREATE TYPE "chat_root_type" AS ENUM ('PRIVATE', 'PUBLIC', 'PROTECTED');

-- CreateEnum
CREATE TYPE "type" AS ENUM ('FRIENDSHIP', 'GAME', 'ACHIEVEMENT', 'MESSAGE');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'ACCEPTED', 'REFUSED', 'BLOCKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "rank" AS ENUM ('ROOKIE', 'CHALLENGER', 'EXPERT', 'LEGEND');

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
    "two_factor_auth" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "sender_id" TEXT NOT NULL,
    "received_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("sender_id","received_id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "received_id" TEXT NOT NULL,
    "room_chat_id" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_chat" (
    "id" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,
    "type" "chat_root_type" NOT NULL,

    CONSTRAINT "room_chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "has_role" (
    "role" "role" NOT NULL,
    "room_chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "has_role_pkey" PRIMARY KEY ("room_chat_id","user_id")
);

-- CreateTable
CREATE TABLE "play" (
    "right_user_id" TEXT NOT NULL,
    "left_user_id" TEXT NOT NULL,
    "game_mode" "mode" NOT NULL,
    "game_map" "map" NOT NULL,

    CONSTRAINT "play_pkey" PRIMARY KEY ("left_user_id","right_user_id")
);

-- CreateTable
CREATE TABLE "game_history" (
    "id" TEXT NOT NULL,
    "left_user_id" TEXT NOT NULL,
    "right_user_id" TEXT NOT NULL,
    "score_left" INTEGER NOT NULL,
    "score_right" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL,

    CONSTRAINT "game_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats" (
    "id" TEXT NOT NULL,
    "wins" INTEGER NOT NULL,
    "loses" INTEGER NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,
    "rank" "rank" NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "have_achievement" (
    "achievement_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "have_achievement_pkey" PRIMARY KEY ("achievement_id","user_id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "type" "type" NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendship" (
    "received_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "status" "status" NOT NULL,

    CONSTRAINT "friendship_pkey" PRIMARY KEY ("sender_id","received_id")
);

-- CreateTable
CREATE TABLE "join" (
    "room_chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "join_pkey" PRIMARY KEY ("room_chat_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_nick_name_key" ON "user"("nick_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "has_role_room_chat_id_key" ON "has_role"("room_chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "has_role_user_id_key" ON "has_role"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "stats_id_key" ON "stats"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stats_user_id_key" ON "stats"("user_id");

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_received_id_fkey" FOREIGN KEY ("received_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_received_id_fkey" FOREIGN KEY ("sender_id", "received_id") REFERENCES "chat"("sender_id", "received_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_received_id_fkey" FOREIGN KEY ("received_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_room_chat_id_sender_id_fkey" FOREIGN KEY ("room_chat_id", "sender_id") REFERENCES "join"("room_chat_id", "user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "has_role" ADD CONSTRAINT "has_role_room_chat_id_fkey" FOREIGN KEY ("room_chat_id") REFERENCES "room_chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "has_role" ADD CONSTRAINT "has_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "play" ADD CONSTRAINT "play_left_user_id_fkey" FOREIGN KEY ("left_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "play" ADD CONSTRAINT "play_right_user_id_fkey" FOREIGN KEY ("right_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_history" ADD CONSTRAINT "game_history_left_user_id_right_user_id_fkey" FOREIGN KEY ("left_user_id", "right_user_id") REFERENCES "play"("left_user_id", "right_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "have_achievement" ADD CONSTRAINT "have_achievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "have_achievement" ADD CONSTRAINT "have_achievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_received_id_fkey" FOREIGN KEY ("received_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "join" ADD CONSTRAINT "join_room_chat_id_fkey" FOREIGN KEY ("room_chat_id") REFERENCES "room_chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "join" ADD CONSTRAINT "join_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
