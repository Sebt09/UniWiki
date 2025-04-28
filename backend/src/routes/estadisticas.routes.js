import express from "express";
import prisma from "../lib/prismaClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [
      totalUniversidades,
      totalProgramas,
      tipoInstitucion,
      programasPorModalidad,
      programasPorCiudadRaw,
      programasPorUniversidadRaw,
      universidades,
    ] = await Promise.all([
      prisma.universidad.count(),
      prisma.programa.count(),
      prisma.universidad.groupBy({
        by: ["tipoInstitucion"],
        _count: true,
      }),
      prisma.programa.groupBy({
        by: ["modalidad"],
        _count: true,
      }),
      prisma.programa.findMany({
        include: { universidad: true },
      }),
      prisma.programa.groupBy({
        by: ["universidadId"],
        _count: true,
      }),
      prisma.universidad.findMany(),
    ]);

    // Universidades por tipo
    const universidadesPorTipo = {};
    tipoInstitucion.forEach((item) => {
      universidadesPorTipo[item.tipoInstitucion] = item._count;
    });

    // Programas por modalidad
    const programasPorModalidadFormatted = {};
    programasPorModalidad.forEach((item) => {
      programasPorModalidadFormatted[item.modalidad] = item._count;
    });

    // Programas por ciudad
    const conteoPorCiudad = {};
    programasPorCiudadRaw.forEach((p) => {
      const ciudad = p.universidad?.ciudad || "Sin ciudad";
      conteoPorCiudad[ciudad] = (conteoPorCiudad[ciudad] || 0) + 1;
    });
    const programasPorCiudad = Object.entries(conteoPorCiudad).map(([ciudad, total]) => ({
      ciudad,
      total,
    }));

    // Programas por universidad (nombres)
    const programasPorUniversidad = programasPorUniversidadRaw.map((item) => {
      const uni = universidades.find((u) => u.id === item.universidadId);
      return {
        nombre: uni?.nombre || "Desconocida",
        total: item._count,
      };
    });

    res.json({
      totalUniversidades,
      totalProgramas,
      universidadesPorTipo,
      programasPorUniversidad,
      programasPorModalidad: programasPorModalidadFormatted,
      programasPorCiudad,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
});

export default router;
