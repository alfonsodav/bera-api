import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.qs()
    const orders = await Order.query()
      .where('status', params.status)
      .orWhere('create_at', params.createdAt)
    return response.status(200).send(orders)
  }
  public async show({ params, response }: HttpContextContract) {
    const orders = await Order.find(params.id)
    return response.status(200).send(orders?.serialize())
  }
  public async store({ request, response }: HttpContextContract) {
    const req = request.body()

    const orders = await Order.create({
      status: req.status,
    })
    return response.status(200).send(orders.serialize())
  }

  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const orders = await Order.findOrFail(params.id)
      orders.acceptedAt = body.acceptedAt || null
      orders.closeAt = body.cancelAt || null
      await orders.save()
      return response.status(200).send(orders?.serialize())
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const orders = await Order.findOrFail(params.id)
      await orders.delete()
      return response.status(200).send(`Usuario eliminado correctamente`)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
