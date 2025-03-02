import {MercadoPagoConfig, Payment, Preference} from "mercadopago"
import { Request, Response } from "express"
import { PayerRequest } from "mercadopago/dist/clients/payment/create/types"
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes"
import dotenv from "dotenv"
import { Order } from "../order/order.model.js"
import { OrderItem } from "../order/orderDetail.model.js"

const client = new MercadoPagoConfig({
  accessToken: "TEST-5380556276184348-012401-fb794cac45ed2b2803d55d2f62a4ab3f-197307509"

})


const payment = new Payment(client)


export const createOrder = async(req: Request, res: Response) => {
  try {
    const { payer, itemsToPay } = req.body // Obtener datos del body

    let result: PreferenceResponse | undefined
    const preference = new Preference(client)
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
          success: "http://localhost:4200/success",
          failure: "http://localhost:4200/failure",
          pending: "http://localhost:4200/pending",
        },
        auto_return: "approved"
      },
      requestOptions: {
        timeout: 5000
      }
    }).then(x => {
      result = x;
    }).catch(err => {
      console.log(err)
    })

    console.log("Pago creado: ", result)
    res.status(200).json({ url: result?.sandbox_init_point })
  } catch (error) {
    console.log("Error al crear el pago:", error)
    res.status(500).json({ message: "Error al crear el pago" })
  }
}

export const savePayment = async (req: Request, res: Response) => {
    // in: paymentId
    const paymentId = req.params.paymentId

    try {
        // Traigo info del pago
        const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer TEST-5380556276184348-012401-fb794cac45ed2b2803d55d2f62a4ab3f-197307509'
            }
        })

        if (!paymentResponse.ok) {
            throw new Error('Error en la petición de pago: ' + paymentResponse.statusText)
        }

        const paymentData = await paymentResponse.json()
        console.log(paymentData)
        const orderId = paymentData.order.id

        // Traigo info de la orden
        const orderResponse = await fetch(`https://api.mercadopago.com/merchant_orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer TEST-5380556276184348-012401-fb794cac45ed2b2803d55d2f62a4ab3f-197307509'
            }
        })

        if (!orderResponse.ok) {
            throw new Error('Error en la petición de orden: ' + orderResponse.statusText)
        }

        const orderData = await orderResponse.json()
        console.log(orderData)

        // Vuelco en BD la orden
         const order = await Order.create({
          id: orderData.id,
          total: orderData.total_amount,
          date: paymentData.date_approved,
          clientId: paymentData.payer.identification.number,
          paymentId: paymentData.id
    })

    // Vuelco en BD los detalles de la orden
        const items = paymentData.additional_info.items
        const orderItems = items.map((item: any) => ({
            orderId: order.id, 
            productId: item.id, 
            quantity: item.quantity, 
            price: item.unit_price
        }))

        await OrderItem.bulkCreate(orderItems)



        res.status(200).json({ paymentData, orderData })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error })
    }
};
