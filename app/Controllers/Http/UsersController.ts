import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import User from 'App/Models/User'
import { v4 as uuidv4 } from 'uuid'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const params = request.qs()
    const search = params.search.replace('[^a-zA-Z0-9]+', '')
    const searchName = `name LIKE "%${search}%" or last_name LIKE "%${search}%" or email LIKE "%${search}%" or phone Like "%${search}%"`
    const user = await User.query().whereRaw(searchName)
    return response.status(200).send(user)
  }
  public async store({ request, response }: HttpContextContract) {
    const req = request.body()
    const avatarFile = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    if (!avatarFile || !avatarFile.isValid) {
      return avatarFile?.errors || 'archivo requerido'
    } else {
      await avatarFile?.move(Application.tmpPath('uploads'), {
        name: uuidv4() + `.${avatarFile.extname}`,
      })
    }

    const user = await User.create({
      name: req.name,
      email: req.email,
      lastName: req.lastName,
      avatarUrl: avatarFile?.fileName,
      phone: req.phone,
      password: req.password,
    })
    return response.status(200).send(user.serialize())
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    return response.status(200).send(user?.serialize())
  }
  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const avatarFile = request.file('avatar', {
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })

      if (!avatarFile || !avatarFile.isValid) {
        return new Error(
          JSON.stringify(avatarFile?.errors) || 'archivo requerido'
        )
      } else {
        await avatarFile?.move(Application.tmpPath('uploads'), {
          name: uuidv4() + `.${avatarFile.extname}`,
        })
      }
      const user = await User.findOrFail(params.id)
      user.name = body.name || user.name
      user.lastName = body.lastName || user.lastName
      user.email = body.email || user.email
      user.phone = body.phone || user.phone
      user.avatarUrl = avatarFile.fileName || null
      await user.save()
      return response.status(200).send(user?.serialize())
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(200).send(`Usuario eliminado correctamente`)
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
