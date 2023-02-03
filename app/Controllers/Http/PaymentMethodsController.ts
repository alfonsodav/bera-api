import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaymentMethod from 'App/Models/PaymentMethod'

export default class PaymentMethodsController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.qs()
    const paymentMethod = await PaymentMethod.query()
      .preload('user')
      .whereILike('name', `%${params.name}%`)
    return response.status(200).send(paymentMethod)
  }
  public async show({ params, response }: HttpContextContract) {
    const paymentMethod = await PaymentMethod.find(params.id)
    return response.status(200).send(paymentMethod?.serialize())
  }
  public async store({ request, response }: HttpContextContract) {
    const req = request.body()

    const paymentMethod = await PaymentMethod.create({
      userId: req.userId,
      name: req.name,
      type: req.type,
      numberAccount: req.numberAccount,
      noIdentification: req.noIdentification,
    })
    return response.status(200).send(paymentMethod.serialize())
  }

  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const paymentMethod = await PaymentMethod.findOrFail(params.id)
      paymentMethod.userId = body.userId
      paymentMethod.name = body.name
      paymentMethod.type = body.type
      paymentMethod.numberAccount = body.numberAccount
      paymentMethod.noIdentification = body.noIdentification
      await paymentMethod.save()
      return response.status(200).send(paymentMethod?.serialize())
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const paymentMethod = await PaymentMethod.findOrFail(params.id)
      await paymentMethod.delete()
      return response.status(200).send(`Metodo de pago eliminado correctamente`)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
