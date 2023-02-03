import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.qs()
    const vehicles = await Vehicle.query()
      .where('driver', params.id)
      .paginate(params.page, 20)
    return response.status(200).send(vehicles)
  }
  public async show({ params, response }: HttpContextContract) {
    const vehicles = await Vehicle.find(params.id)
    return response.status(200).send(vehicles?.serialize())
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    try {
      const vehicles = await Vehicle.create({
        vehicleId: body.vehicleId,
        make: body.make,
        model: body.model,
        color: body.color,
        year: body.year,
        vehicleType: body.vehicleType,
      })
      return response.status(200).send(vehicles.serialize())
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()
    try {
      const vehicle = await Vehicle.findOrFail(params.id)

      vehicle.vehicleId = body.vehicleId
      vehicle.make = body.make || vehicle.make
      vehicle.model = body.model || vehicle.model
      vehicle.color = body.color || vehicle.color
      vehicle.year = body.year || vehicle.year
      vehicle.vehicleType = body.vehicleType || vehicle.vehicleType

      return response.status(200).send(vehicle.serialize())
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
}
