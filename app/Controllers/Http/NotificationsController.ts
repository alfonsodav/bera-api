import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'

export default class NotificationsController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.qs()
    const notifications = await Notification.query()
      .where('user', params.id)
      .paginate(params.page, 20)
    return response.status(200).send(notifications)
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    try {
      const notification = await Notification.create({
        title: body.title,
        message: body.message,
        system: body.system,
        userId: body.user,
        orderId: body.order,
      })
      return response.status(200).send(notification.serialize())
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
  public async show({ params, response }: HttpContextContract) {
    const notification = await Notification.find(params.id)
    return response.status(200).send(notification?.serialize())
  }
}
