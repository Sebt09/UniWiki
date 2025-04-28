import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import programasRoutes from "./routes/programas.routes.js";
import universidadesRoutes from "./routes/universidades.routes.js";
import estadisticasRoutes from "./routes/estadisticas.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/programas", programasRoutes);
app.use("/api/universidades", universidadesRoutes);
app.use("/api/estadisticas", estadisticasRoutes); // ✅ Ruta de estadísticas

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
