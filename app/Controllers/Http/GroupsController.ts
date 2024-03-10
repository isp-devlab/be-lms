import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ApiResponse from 'App/Helpers/ApiResponse'
import Group from 'App/Models/Group'
import Member from 'App/Models/Member'

export default class GroupsController {
  public async show({ response, params, auth }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const memberCheck = await Member.query()
      .where('group_id', params.id)
      .where('user_id', getUser.id)
      .first()
    if (!memberCheck) return ApiResponse.forbidden(response, 'Access denied')

    const data = await Group.query()
      .where('id', params.id)
      .preload('member', (postsQuery) => {
        postsQuery.preload('user')
      })
      .preload('teacher', (postsQuery) => {
        postsQuery.preload('mentor')
      })
      .withCount('discussion', (query) => {
        query.as('discussionCount')
      })
      .withCount('assignment', (query) => {
        query.as('assignmentCount')
      })
      .first()
    if (!data) return ApiResponse.badRequest(response, 'No data to show.')
    return ApiResponse.ok(response, data, 'Group retrieved successfully')
  }

  public async join({ request, response, auth }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()
    const groupJoinSchema = schema.create({
      referralCode: schema.string(),
    })
    const payload = await request.validate({ schema: groupJoinSchema })
    const group = await Group.query().where('referral_code', payload.referralCode).first()
    if (!group) return ApiResponse.badRequest(response, 'No data')

    const memberCheck = await Member.query()
      .where('group_id', group.id)
      .where('user_id', getUser.id)
      .first()
    if (memberCheck) return ApiResponse.conflict(response, 'Member already joined')

    const member = new Member()
    member.groupId = group.id
    member.userId = getUser.id
    await member.save()

    return ApiResponse.ok(response, group, 'Member joined successfully')
  }

  public async leave({ response, auth, params }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()
    const group = await Group.query().where('id', params.id).first()
    if (!group) return ApiResponse.badRequest(response, 'No data')

    const memberCheck = await Member.query()
      .where('group_id', group.id)
      .where('user_id', getUser.id)
      .first()
    if (!memberCheck) return ApiResponse.forbidden(response, 'Access denied')

    const member = await Member.find(memberCheck.id)
    const data = await member?.delete()

    return ApiResponse.ok(response, data, 'Member Leave successfully')
  }
}
