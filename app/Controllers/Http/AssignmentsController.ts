import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponse from 'App/Helpers/ApiResponse'
import Assignment from 'App/Models/Assignment'
import Member from 'App/Models/Member'

export default class AssignmentsController {
  public async index({ response, params, auth, request }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const memberCheck = await Member.query()
      .where('group_id', params.id)
      .where('user_id', getUser.id)
      .first()
    if (!memberCheck) return ApiResponse.forbidden(response, 'Access denied')

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await Assignment.query()
      .where('group_id', params.id)
      .preload('mentor')
      .preload('attachment', (query) => {
        query.preload('user')
      })
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return ApiResponse.ok(response, data, 'Assignment retrieved successfully')
  }

  public async show({ response, params, auth }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const memberCheck = await Member.query()
      .where('group_id', params.id)
      .where('user_id', getUser.id)
      .first()
    if (!memberCheck) return ApiResponse.forbidden(response, 'Access denied')

    const data = await Assignment.query()
      .where('id', params.id_assignment)
      .where('group_id', params.id)
      .preload('mentor')
      .preload('attachment', (query) => {
        query.preload('user')
      })
      .first()

    return ApiResponse.ok(response, data, 'Discussion show retrieved successfully')
  }
}
