import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'
import { saveFile } from 'App/services/FileManager'

export default class DriversController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.qs()
    const search = params.search?.replace('[^a-zA-Z0-9]+', '')
    const searchName = `name LIKE "%${search}%" or last_name LIKE "%${search}%" or email LIKE "%${search}%" or phone Like "%${search}%"`
    const drivers = await Driver.query().whereRaw(searchName)
    return response.status(200).send(drivers)
  }
  public async store({ request, response }: HttpContextContract) {
    const req = request.body()
    let avatarFile = await saveFile(request, 'avatar')

    const drivers = await Driver.create({
      name: req.name,
      email: req.email,
      lastName: req.lastName,
      avatarUrl: avatarFile?.fileName,
      phone: req.phone,
      password: req.password,
    })
    return response.status(200).send(drivers.serialize())
  }

  public async show({ params, response }: HttpContextContract) {
    const drivers = await Driver.find(params.id)
    return response.status(200).send(drivers?.serialize())
  }
  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const avatarFile = await saveFile(request, 'avatar')
      const driverlicence = await saveFile(request, 'driver_licence')
      const address = await saveFile(request, 'addresss')
      const drivers = await Driver.findOrFail(params.id)
      drivers.name = body.name || drivers.name
      drivers.lastName = body.lastName || drivers.lastName
      drivers.email = body.email || drivers.email
      drivers.phone = body.phone || drivers.phone
      drivers.expiryDateLicence = body.expiryDateLicense
      drivers.avatarUrl = avatarFile.fileName || null
      drivers.drivingLicence = driverlicence.filename || null
      drivers.addressProof = address.filename || null
      await drivers.save()
      return response.status(200).send(drivers?.serialize())
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const drivers = await Driver.findOrFail(params.id)
      await drivers.delete()
      return response.status(200).send(`Conductor eliminado correctamente`)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
