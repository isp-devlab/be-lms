import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import ApiResponse from 'App/Helpers/ApiResponse'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import Mail from '@ioc:Adonis/Addons/Mail'
import uuid from 'uuid-wand'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const registerSchema = schema.create({
      name: schema.string(),
      // phoneNumber: schema.string(),
      email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string([rules.minLength(6)]),
      isStudent: schema.boolean(),
    })
    const payload = await request.validate({ schema: registerSchema })

    const user = new User()
    user.name = payload.name
    user.phoneNumber = request.body().phoneNumber
    user.email = payload.email
    user.password = payload.password
    user.isStudent = payload.isStudent
    user.isActive = false
    const data = await user.save()

    const token = uuid.v4()
    await Database.insertQuery().table('account_activation_tokens').insert({
      email: user.email,
      token: token,
    })

    const activationUrl = process.env.HOST + `/activation/${token}`
    const email = payload.email

    await Mail.send((message) => {
      message
        .from('noreply@unimal.link')
        .to(email)
        .subject('Aktivasi akun kelas ISP')
        .htmlView('emails/account_activation', { email, activationUrl })
    })

    return ApiResponse.created(response, data, 'User register created successfully')
  }

  public async activation({ params, response }: HttpContextContract) {
    const activationRecord = await Database.from('account_activation_tokens')
      .where('token', params.token)
      .first()
    if (!activationRecord) return 'invalid token'

    const user = await User.findByOrFail('email', activationRecord.email)
    user.isActive = true
    await user.save()

    await Database.from('account_activation_tokens').where('email', activationRecord.email).delete()
    return response.redirect(process.env.FE_URL + `/aktivasi/sukses`)
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const loginSchema = schema.create({
        email: schema.string([rules.email()]),
        password: schema.string(),
      })
      const payload = await request.validate({ schema: loginSchema })

      const user = await User.query().where('email', payload.email).where('is_active', true).first()
      if (!user) {
        return ApiResponse.unauthorized(response, 'Invalid Credentials or Inactive User')
      }
      const email = payload.email
      const password = payload.password
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1 days',
      })
      return ApiResponse.ok(
        response,
        { user: user, access_token: token },
        'User Login successfully'
      )
    } catch (error) {
      return ApiResponse.unauthorized(response, 'Invalid Credentials')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return ApiResponse.ok(response, null, 'User logged out successfully')
  }

  public async me({ auth, response }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()
    // Assuming you want to preload the 'role' relationship
    const user = await User.query()
      .where('id', getUser.id)
      // .count('id')
      .preload('member', (memberQuery) => {
        memberQuery.preload('group')
      })
      .preload('student', (postsQuery) => {
        postsQuery.preload('class')
      })
      .first()
    return ApiResponse.ok(response, user, 'User details retrived successfully')
  }

  public async forget({ request, response }: HttpContextContract) {
    const forgotPasswordSchema = schema.create({
      email: schema.string({}, [rules.email()]),
    })

    const payload = await request.validate({ schema: forgotPasswordSchema })

    const user = await User.findBy('email', payload.email)
    if (!user) return ApiResponse.badRequest(response, 'User not found')

    const token = uuid.v4()

    await Database.insertQuery()
      .table('password_reset_tokens')
      .insert({
        email: user.email,
        token: token,
        expires_at: new Date(Date.now() + 3600000), // 1 hour expiration
      })

    const resetUrl = process.env.FE_URL + `/reset-password/${token}?email=${user.email}` // Change to your app's reset password page URL

    await Mail.send((message) => {
      message
        .from('noreply@unimal.link')
        .to(user.email)
        .subject('Reset Password')
        .htmlView('emails/password_reset', { user, resetUrl })
    })

    return ApiResponse.ok(response, null, 'Password reset email sent successfully')
  }

  public async reset({ request, response }: HttpContextContract) {
    const resetPasswordSchema = schema.create({
      token: schema.string(),
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.minLength(6)]),
    })

    const payload = await request.validate({ schema: resetPasswordSchema })

    // Find the user with the email
    const user = await User.findBy('email', payload.email)

    if (!user) return ApiResponse.notFound(response, 'User not found')

    const resetRecord = await Database.from('password_reset_tokens')
      .where('email', payload.email)
      .where('token', payload.token)
      .where('expires_at', '>', new Date())
      .first()

    if (!resetRecord) return ApiResponse.unauthorized(response, 'Invalid or expired reset token')

    user.password = payload.password
    await user.save()

    await Database.from('password_reset_tokens').where('email', payload.email).delete()

    return ApiResponse.ok(response, null, 'Password reset successful')
  }
}
