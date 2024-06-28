import express from 'express'
import { clientRouter } from './Client/client.routes.js'
import { medicalHistoryRouter } from './medicalHistory/medicalHistory.routes.js'
import { professionalRouter } from './professional/professional.routes.js'
import { petRouter } from "./pet/pet.routes.js"


const app = express()
app.use(express.json())

app.use('/api/clients', clientRouter)
app.use('/api/medicalHistory', medicalHistoryRouter)
app.use('/api/professionals', professionalRouter)
app.use('/api/pets', petRouter ) 

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
