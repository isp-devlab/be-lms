import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import ApiResponse from 'App/Helpers/ApiResponse'
import UploadHelper from 'App/Helpers/UploadHelper'
import User from 'App/Models/User'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import Member from 'App/Models/Member'
import Student from 'App/Models/Student'

export default class ProfilesController {
  public async update({ auth, request, response }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const ProfileUpdateSchema = schema.create({
      name: schema.string(),
      phoneNumber: schema.string(),
      email: schema.string([
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
          whereNot: { id: getUser.id }, // Exclude the current user
        }),
      ]),
      image: schema.file.optional({
        size: '2mb',
        extnames: ['jpg', 'gif', 'png'],
      }),
    })
    const payload = await request.validate({ schema: ProfileUpdateSchema })

    const user = await User.findOrFail(getUser.id)
    user.name = payload.name
    user.email = payload.email
    // Handle file upload for the image
    if (payload.image) {
      const imagePath = await UploadHelper.upload(payload.image, 'user')
      user.image = imagePath
    }
    user.phoneNumber = payload.phoneNumber
    const data = await user.save()

    return ApiResponse.ok(response, data, 'Profile update successfully')
  }

  public async changePassword({ auth, request, response }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const passwordChangeSchema = schema.create({
      password: schema.string([rules.minLength(6)]),
    })
    const payload = await request.validate({ schema: passwordChangeSchema })

    const user = await User.findOrFail(getUser.id)
    user.password = payload.password
    const data = await user.save()

    return ApiResponse.ok(response, data, 'Password change successfully')
  }

  public async group({ auth, response }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const data = await Member.query()
      .where('user_id', getUser.id)
      .preload('group', (query) => {
        query.preload('member', (query) => {
          query.preload('user')
        })
      })

    return ApiResponse.ok(response, data, 'My group retrieved successfully')
  }

  public async class({ auth, response }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const data = await Student.query()
      .where('user_id', getUser.id)
      .preload('class', (query) => {
        query.preload('mentor')
        query.preload('category')
      })

    return ApiResponse.ok(response, data, 'My Class retrieved successfully')
  }
}
