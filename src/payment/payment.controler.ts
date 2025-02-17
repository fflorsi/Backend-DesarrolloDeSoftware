import {MercadoPagoConfig, Payment, Preference} from "mercadopago"
import { Request, Response } from "express"
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types"
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes"
import dotenv from "dotenv"

const client = new MercadoPagoConfig({
  accessToken: "TEST-5380556276184348-012401-fb794cac45ed2b2803d55d2f62a4ab3f-197307509"

})


const payment = new Payment(client)


export const createOrder = async(req: Request, res: Response) => {
  try {
    const { payer, itemsToPay } = req.body; // Obtener datos del body

    let result: PreferenceResponse | undefined;
    const preference = new Preference(client);
    await preference.create({
      body: {
        items: itemsToPay,
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
        notification_url: "https://47a8-181-97-147-163.ngrok-free.app/api/payment/webhook"
      },
      requestOptions: {
        timeout: 5000
      }
    }).then(x => {
      console.log(x);
      result = x;
    }).catch(err => {
      console.log(err);
    });

    console.log("Pago creado: ", result);
    res.status(200).json({ url: result?.sandbox_init_point });
  } catch (error) {
    console.log("Error al crear el pago:", error);
    res.status(500).json({ message: "Error al crear el pago" });
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

export const webhook = async (req:Request, res:Response) => {
  const paymentId = req.query.id
  try{
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${client.accessToken}`
      }
    }
    )

    if(response.ok){
      const data = await response.json()
      console.log(data)
      
    }
    res.sendStatus(200)
  } catch (error) {
    console.error('Error: ', error)
    res.sendStatus(500)
  }
}