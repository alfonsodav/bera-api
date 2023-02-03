import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment'

export default class PaymentsController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.qs()
    const vehicles = await Payment.query()
      .where('driver', params.id)
      .paginate(params.page, 20)
    return response.status(200).send(vehicles)
  }
  public async show({ params, response }: HttpContextContract) {
    const vehicles = await Payment.find(params.id)
    return response.status(200).send(vehicles?.serialize())
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    try {
      const vehicles = await Payment.create({
        typeMethod: body.typeMethod,
        nameMethod: body.nameMethod,
        mount: body.mount,
        currency: body.currency,
        orderId: body.orderId,
      })
      return response.status(200).send(vehicles.serialize())
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()
    try {
      const vehicle = await Payment.findOrFail(params.id)

      vehicle.typeMethod = body.typeMethod
      vehicle.nameMethod = body.nameMethod
      vehicle.mount = body.mount
      vehicle.currency = body.currency
      vehicle.orderId = body.orderId

      return response.status(200).send(vehicle.serialize())
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
}
