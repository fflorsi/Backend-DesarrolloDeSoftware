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
import { Type } from "./types/type.model.js";
import { Pet } from "./pet/pet.model.js";
import { MedicalHistory } from "./medicalHistory/medicalHistory.model.js";
import { Observation } from "./observation/observation.model.js";
import { Professional } from "./professional/professional.model.js";
import { Vaccine } from "./vaccine/vaccine.model.js";
import { vaccineRouter } from "./vaccine/vaccine.routes.js";
import { Facility } from "./facility/facility.model.js";
import { facilityRouter } from "./facility/facility.routes.js";
import { MedicalHistoryVaccine } from "./medicalHistory/medicalHistory_vaccines.model.js";
import { Appointment } from "./appointment/appointment.model.js";
import {appointmentRouter} from "./appointment/appointment.routes.js";
import "./association.js";
import { typeRouter } from "./types/type.routes.js";
import { Order } from "./order/order.model.js";
import { OrderItem } from "./order/orderDetail.model.js";
import { orderRouter } from "./order/order.routes.js";
import { User } from "./user/user.model.js";
import { paymentRouter } from "./payment/payment.routes.js";
import { report } from "process";
import { reportRouter } from "./report/report.routes.js";
import { Client } from "./client/client.model.js";
import { Product } from "./product/product.model.js";

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
