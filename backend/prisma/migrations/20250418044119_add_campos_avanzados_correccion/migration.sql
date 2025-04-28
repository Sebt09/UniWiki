/*
  Warnings:

  - Added the required column `tituloOtorgado` to the `Programa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `Universidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkSitioWeb` to the `Universidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoInstitucion` to the `Universidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorInscripcion` to the `Universidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programa" ADD COLUMN     "numeroCreditos" INTEGER,
ADD COLUMN     "perfilProfesional" TEXT,
ADD COLUMN     "sitioWeb" TEXT,
ADD COLUMN     "tituloOtorgado" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Universidad" ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "linkSitioWeb" TEXT NOT NULL,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "tipoInstitucion" TEXT NOT NULL,
ADD COLUMN     "valorInscripcion" DOUBLE PRECISION NOT NULL;
