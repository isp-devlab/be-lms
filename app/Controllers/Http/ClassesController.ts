//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import ApiResponse from 'App/Helpers/ApiResponse'

export default class ClassesController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const q = request.input('q', '')
    const data = await Class.query()
      .where('name', 'LIKE', `%${q}%`)
      .where('is_active', true)
      .preload('category')
      .preload('mentor')
      .paginate(page, limit)
    return ApiResponse.ok(response, data, 'Class retrieved successfully')
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await Class.query()
      .where('slug', params.slug)
      .where('is_active', true)
      .preload('category')
      .preload('mentor')
      .preload('lesson')
      .preload('student', (query) => {
        query.preload('user')
      })
    return ApiResponse.ok(response, data, 'Class show retrieved successfully')
  }
}
