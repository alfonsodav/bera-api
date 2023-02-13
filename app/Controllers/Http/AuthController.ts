import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  async userLogin({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return response.send({ token: `${token.type} ${token.token}` })
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
  async driverLogin({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    // Lookup user manually
    const user = await Driver.query()
      .where('email', email)
      //.where('tenant_id', getTenantIdFromSomewhere)
      .whereNull('is_deleted')
      .firstOrFail()

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    // Generate token
    const token = await auth.use('api').generate(user)
    return token
  }
}
