import express from "express"
import cors from "cors";
import  sequelize  from './db/connection';
import { petRouter } from "./pet/pet.routes"
import { clientRouter } from "./client/client.routes"
import { medicalHistoryRouter } from "./medicalHistory/medicalHistory.routes"
import { professionalRouter } from "./professional/professional.routes"
import { observationRouter } from "./observation/observation.routes"
import { userRouter } from "./user/user.routes";
import { productRouter } from "./product/product.routes";
import { vaccineRouter } from "./vaccine/vaccine.routes";
import { facilityRouter } from "./facility/facility.routes";
import {appointmentRouter} from "./appointment/appointment.routes";
import "./association";
import { typeRouter } from "./types/type.routes";
import { orderRouter } from "./order/order.routes";
import { paymentRouter } from "./payment/payment.routes";
import { reportRouter } from "./report/report.routes";

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
//clientes
app.use('/api/clients', clientRouter )
//mascotas
app.use('/api/pets', petRouter ) 




//mediccalhistory
app.use('/api/medicalhistory', medicalHistoryRouter )

app.use('/api/observation', observationRouter)

app.use('/api/vaccines', vaccineRouter)
app.use('/api/users', userRouter);
app.use('/api/products',productRouter)

//facilities
app.use('/api/facilities', facilityRouter)

//turnos
app.use('/api/appointments', appointmentRouter);

app.use('/api/types', typeRouter)

app.use('/api/orders', orderRouter)

//pago

app.use('/api/payment', paymentRouter)

//reportes
app.use('/api/report',reportRouter)

// Manejo de rutas no encontradas
app.use((req, res) => {
  return res.status(404).send({ message: "Not found" });
});

// Sincronización de modelos con la base de datos
(async () => {
  try {

    await sequelize.sync(); 
    console.log("Tablas sincronizadas correctamente");

    // Inicia el servidor
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error al sincronizar las tablas:", error);
  }
})();

export default app;