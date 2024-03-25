import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ApiResponse from 'App/Helpers/ApiResponse'
import Comment from 'App/Models/Comment'
import Discussion from 'App/Models/Discussion'
import Member from 'App/Models/Member'

export default class DiscussionsController {
  public async index({ response, params, auth, request }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const memberCheck = await Member.query()
      .where('group_id', params.id)
      .where('user_id', getUser.id)
      .first()
    if (!memberCheck) return ApiResponse.forbidden(response, 'Access denied')

    const page = request.input('page', 1)
    const limit = request.input('limit', 5)
    const data = await Discussion.query()
      .where('group_id', params.id)
      .preload('mentor')
      .withCount('comment', (query) => {
        query.as('commentCount')
      })
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return ApiResponse.ok(response, data, 'Discussion retrieved successfully')
  }

  public async show({ response, params, auth }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const memberCheck = await Member.query()
      .where('group_id', params.id)
      .where('user_id', getUser.id)
      .first()
    if (!memberCheck) return ApiResponse.forbidden(response, 'Access denied')

    const data = await Discussion.query()
      .where('id', params.id_discussion)
      .where('group_id', params.id)
      .preload('mentor')
      .preload('comment', (query) => {
        query.orderBy('created_at', 'asc')
        query.preload('user')
      })
      .first()

    return ApiResponse.ok(response, data, 'Discussion show retrieved successfully')
  }

  public async comment({ response, params, auth, request }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const commentSchema = schema.create({
      comment: schema.string(),
    })
    const payload = await request.validate({ schema: commentSchema })

    const comment = new Comment()
    comment.userId = getUser.id
    comment.discussionId = params.id_discussion
    comment.content = payload.comment
    const data = await comment.save()

    return ApiResponse.ok(response, data, 'Comment created successfully')
  }
}
