-- CreateTable
CREATE TABLE "Universidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "modalidad" TEXT NOT NULL,

    CONSTRAINT "Universidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "duracion" TEXT NOT NULL,
    "modalidad" TEXT NOT NULL,
    "universidadId" INTEGER NOT NULL,

    CONSTRAINT "Programa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Programa" ADD CONSTRAINT "Programa_universidadId_fkey" FOREIGN KEY ("universidadId") REFERENCES "Universidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
