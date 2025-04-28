import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();


// POST /api/universidades
router.post("/", async (req, res) => {
  try {
    const { valorInscripcion, ...rest } = req.body;

    const universidad = await prisma.universidad.create({
      data: {
        ...rest,
        valorInscripcion: valorInscripcion !== undefined && valorInscripcion !== "" 
          ? parseFloat(valorInscripcion) 
          : null
      }
    });

    res.json(universidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la universidad" });
  }
});


// GET /api/universidades
router.get("/", async (req, res) => {
  try {
    const universidades = await prisma.universidad.findMany();
    res.json(universidades);
  } catch (error) {
    console.error("Error al obtener universidades:", error);
    res.status(500).json({ error: "No se pudieron obtener las universidades" });
  }
});

// DELETE /api/universidades/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Verifica si tiene programas asociados
    const programas = await prisma.programa.findMany({
      where: { universidadId: parseInt(id) }
    });

    if (programas.length > 0) {
      return res.status(400).json({
        error: "No se puede eliminar la universidad porque tiene programas registrados."
      });
    }

    await prisma.universidad.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: "Universidad eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar universidad:", error);
    res.status(500).json({ error: "No se pudo eliminar la universidad" });
  }
});

// GET /api/universidades/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const universidad = await prisma.universidad.findUnique({
      where: { id: parseInt(id) },
      include: {
        programas: true,
      },
    });
    res.json(universidad);
  } catch (error) {
    console.error("Error al obtener universidad:", error);
    res.status(500).json({ error: "No se pudo obtener la universidad" });
  }
});


// PUT /api/universidades/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { id: bodyId, programas, ...updateData } = req.body;

  // Manejo del valorInscripcion, similar al POST
  updateData.valorInscripcion =
    updateData.valorInscripcion !== undefined && updateData.valorInscripcion !== ""
      ? parseFloat(updateData.valorInscripcion)
      : null;

  try {
    const universidad = await prisma.universidad.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json(universidad);
  } catch (error) {
    console.error("Error al actualizar universidad:", error);
    res.status(500).json({ error: "No se pudo actualizar la universidad" });
  }
});



export default router;
