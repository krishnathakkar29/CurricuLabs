/*
  Warnings:

  - Made the column `credits` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "credits" SET NOT NULL,
ALTER COLUMN "credits" SET DEFAULT 2;
