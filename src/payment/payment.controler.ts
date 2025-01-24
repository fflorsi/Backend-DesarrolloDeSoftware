import {MercadoPagoConfig, Payment, Preference} from "mercadopago"
import { Request, Response } from "express"
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types"
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes"
import dotenv from "dotenv"

const client = new MercadoPagoConfig({
  accessToken: "TEST-5380556276184348-012401-fb794cac45ed2b2803d55d2f62a4ab3f-197307509",
  options: {
    timeout: 5000
  },

})


const payment = new Payment(client)


export const createOrder = async(req: Request, res: Response)=>{
  try{
    const payer: PayerRequest = {
      email: "comprados1889@gmail.com",
      first_name: "Edgardo",
      last_name: "Bauza",
      phone: {
        area_code: "54",
        number: "3413080322"
      },
      address:{
        street_name: "Calle A",
        street_number: "123",
        zip_code: "2000",
        city: "Rosario"
      },
      identification:{
        type: "DNI",
        number: "45265350"
      }
    }
    const itemsToPay = [
      {
        id: "001",
        title: "Producto A",
        description: "Es el gran producto A",
        category_id: "1",
        quantity: 1,
        unit_price: 1000
      },
      {
        id: "002",
        title: "Producto B",
        description: "Es el gran producto B",
        category_id: "1",
        quantity: 1,
        unit_price: 10000
      }
    ]
    let result : PreferenceResponse | undefined
    const preference = new Preference(client)
    await preference.create({
      body:{items: itemsToPay,
            payer,
            redirect_urls: {
              success: "https://www.example.com/success",
              failure: "https://www.example.com/failure",
              pending: "https://www.example.com/pending",
            },
            back_urls: {
              success: "http://localhost:3000/api/payment/success",
              failure: "http://localhost:3000/api/payment/failure",
              pending: "http://localhost:3000/api/payment/pending",
            },
            auto_return: "approved",
          },
          requestOptions: {
            timeout: 5000
          }
    }).then(x=>{
      console.log(x)
      result = x
    }).catch(err=>{
      console.log(err)
    })
    console.log("Pago creado: ", result)
    res.status(200).json({url: result?.sandbox_init_point})
  }
  catch (error){
    console.log("Error al crear el pago:", error)
    res.status(500).json({message: "Error al crear el pago"})
  }
}

export const success = async (req:Request, res:Response) => {
  try{
    const data = req.query as unknown as PaymentResponse
    console.log("Data: ", data)
    //Procesar el estado del pago en la BD
    res.status(200).json({
      message: "Pago realizado de forma exitosa",
      data
    })
  }
  catch(error){
    console.log("Error en el pago", error)
  }
}

export const failure = async (req:Request, res:Response) => {
  try{
    const data = req.query as unknown as PaymentResponse
    console.log("Data: ", data)
  }
  catch(error){
    console.log("Error en el pago", error)
  }  
}

export const pending = async (req:Request, res:Response) => {
  try{
    const data = req.query as unknown as PaymentResponse
    console.log("Data: ", data)
  }
  catch(error){
    console.log("Error en el pago", error)
  }  
}