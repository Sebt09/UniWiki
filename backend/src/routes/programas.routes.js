import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/programas/buscar?nombre=ingenieria
router.get("/buscar", async (req, res) => {
  const { nombre, ciudad, modalidad, nivel, costoMaximo, universidadId } = req.query; // ← añadimos universidadId

  try {
    // Traer todos los programas con su universidad relacionada
    const programas = await prisma.programa.findMany({
      include: {
        universidad: true,
      },
    });

    // Función para normalizar texto (sin tildes y minúsculas)
    const normalizar = (texto) =>
      texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // Normalizar los filtros del query
    const nombreFiltro = nombre ? normalizar(nombre) : null;
    const ciudadFiltro = ciudad ? normalizar(ciudad) : null;
    const modalidadFiltro = modalidad ? normalizar(modalidad) : null;
    const nivelFiltro = nivel ? normalizar(nivel) : null;
    const costoFiltro = costoMaximo ? parseFloat(costoMaximo) : null;
    const universidadFiltro = universidadId ? parseInt(universidadId) : null; // ← nuevo filtro

    // Aplicar filtros manualmente
    const resultados = programas.filter((p) => {
      const nombrePrograma = normalizar(p.nombre);
      const ciudadUniversidad = normalizar(p.universidad.ciudad);
      const modalidadPrograma = normalizar(p.modalidad);
      const nivelPrograma = normalizar(p.nivel);

      return (
        (!nombreFiltro || nombrePrograma.includes(nombreFiltro)) &&
        (!ciudadFiltro || ciudadUniversidad.includes(ciudadFiltro)) &&
        (!modalidadFiltro || modalidadPrograma.includes(modalidadFiltro)) &&
        (!nivelFiltro || nivelPrograma.includes(nivelFiltro)) &&
        (!costoFiltro || p.costoSemestre <= costoFiltro) &&
        (!universidadFiltro || p.universidadId === universidadFiltro) // ← aplicamos aquí
      );
    });

    res.json(resultados);
  } catch (error) {
    console.error("Error en búsqueda avanzada:", error);
    res.status(500).json({ error: "Error al buscar programas." });
  }
});




// GET /api/programas
router.get("/", async (req, res) => {
  try {
    const programas = await prisma.programa.findMany({
      include: {
        universidad: true,
      },
      orderBy: {
        nombre: 'asc'
      }
    });
    res.json(programas);
  } catch (error) {
    console.error("Error al obtener programas:", error);
    res.status(500).json({ error: "No se pudieron obtener los programas" });
  }
});



// POST /api/programas
// POST /api/programas
router.post("/", async (req, res) => {
  try {
    const {
      nombre,
      nivel,
      duracion,
      modalidad,
      costoSemestre,
      descripcion,
      planEstudiosUrl,
      tituloOtorgado,
      numeroCreditos,
      perfilProfesional,
      sitioWeb,
      universidadId,
    } = req.body;

    const programa = await prisma.programa.create({
      data: {
        nombre,
        nivel,
        duracion,
        modalidad,
        costoSemestre: costoSemestre ? parseFloat(costoSemestre) : null,
        descripcion,
        planEstudiosUrl,
        tituloOtorgado,
        numeroCreditos: numeroCreditos ? parseInt(numeroCreditos) : null,
        perfilProfesional,
        sitioWeb,
        universidad: { connect: { id: parseInt(universidadId) } },
      }
    });
    res.json(programa);
  } catch (error) {
    console.error("Error al registrar programa:", error);
    res.status(500).json({ error: "No se pudo registrar el programa" });
  }
});


// DELETE /api/programas/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.programa.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: "Programa eliminado" });
  } catch (error) {
    console.error("Error al eliminar programa:", error);
    res.status(500).json({ error: "No se pudo eliminar el programa" });
  }
});

// GET /api/programas/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const programa = await prisma.programa.findUnique({
      where: { id: parseInt(id) },
      include: {
        universidad: true,
      },
    });
    res.json(programa);
  } catch (error) {
    console.error("Error al obtener programa:", error);
    res.status(500).json({ error: "No se pudo obtener el programa" });
  }
});

/*
// PUT /api/programas/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { id: bodyId, ...updateData } = req.body; // Excluye 'id' del body
  try {
    const programa = await prisma.programa.update({
      where: { id: parseInt(id) },
      data: updateData // Usa el objeto sin el 'id'
    });
    res.json(programa);
  } catch (error) {
    console.error("Error al actualizar programa:", error);
    res.status(500).json({ error: "No se pudo actualizar el programa" });
  }
});
*/
// PUT /api/programas/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { universidadId, costoSemestre, numeroCreditos, ...updateData } = req.body;

  if (universidadId) {
    updateData.universidad = { connect: { id: parseInt(universidadId) } };
  }

  updateData.costoSemestre = costoSemestre ? parseFloat(costoSemestre) : null;
  updateData.numeroCreditos = numeroCreditos ? parseInt(numeroCreditos) : null;

  delete updateData.id; // por si acaso

  try {
    const programa = await prisma.programa.update({
      where: { id: parseInt(id) },
      data: updateData
    });
    res.json(programa);
  } catch (error) {
    console.error("Error al actualizar programa:", error);
    res.status(500).json({ error: "No se pudo actualizar el programa" });
  }
});



export default router;
