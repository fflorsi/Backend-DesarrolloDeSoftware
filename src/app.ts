import express from "express"
import cors from "cors";
import  sequelize  from './db/connection.js';
import { petRouter } from "./pet/pet.routes.js"
import { clientRouter } from "./client/client.routes.js"
import { medicalHistoryRouter } from "./medicalHistory/medicalHistory.routes.js"
import { professionalRouter } from "./professional/professional.routes.js"
import { observationRouter } from "./observation/observation.routes.js"
import { userRouter } from "./user/user.routes.js";
import { productRouter } from "./product/product.routes.js";

const app = express()
app.use(express.json()) //solo va a mirar donde tengamos el content type 

//user --> request-->express-->middleware que forme req.body--> app.post (req.body)-->response-->user
//get /api/mascota/ obtener info de mascotas
//get /api/mascota/:id obtener info de una mascota en particular
//post /api/mascota/ crear nuevos recursos
//delete /api/mascota/:id eliminar recursos
//mascota -> /api/mascota/
app.use(cors({
  origin: "http://localhost:4200",
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))

//profesionales
app.use('/api/professionals', professionalRouter)
//mascotas
app.use('/api/pets', petRouter ) 

//clientes
app.use('/api/clients', clientRouter )

//mediccalhistory
app.use('/api/medicalhistory', medicalHistoryRouter )

app.use('/api/observation', observationRouter)
app.use('/api/users', userRouter);
app.use('/api/products',productRouter)


// Manejo de rutas no encontradas
app.use((req, res) => {
  return res.status(404).send({ message: "Not found" });
});

// Sincronización de modelos con la base de datos
(async () => {
  try {
    await sequelize.sync(); // Sincroniza todos los modelos con la base de datos
    console.log("Tablas sincronizadas correctamente");

    // Inicia el servidor
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error al sincronizar las tablas:", error);
  }
})();
