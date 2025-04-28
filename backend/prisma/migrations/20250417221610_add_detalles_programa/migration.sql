/*
  Warnings:

  - Added the required column `costoSemestre` to the `Programa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Programa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programa" ADD COLUMN     "costoSemestre" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "planEstudiosUrl" TEXT;
