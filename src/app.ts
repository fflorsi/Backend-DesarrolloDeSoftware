import express from "express"
import cors from "cors";
import { petRouter } from "./pet/pet.routes.js"
import { clientRouter } from "./client/client.routes.js"
import { medicalHistoryRouter } from "./medicalHistory/medicalHistory.routes.js"
import { professionalRouter } from "./professional/professional.routes.js"
import { observationRouter } from "./observation/observation.routes.js"


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

app.use((req, res) => {
  return res.status(404).send({message: "Not found"});
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
}) 