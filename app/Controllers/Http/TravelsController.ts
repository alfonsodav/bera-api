import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Travel from 'App/Models/Travel'

export default class TravelsController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.qs()
    const travels = await Travel.query()
      .where('order', params.id)
      .paginate(params.page, 20)
    return response.status(200).send(travels)
  }
  public async show({ params, response }: HttpContextContract) {
    const travel = await Travel.find(params.id)
    return response.status(200).send(travel?.serialize())
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    try {
      const travel = await Travel.create({
        start: body.start,
        end: body.end,
        orderId: body.orderId,
      })
      return response.created(travel)
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
}
