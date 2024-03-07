import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import ApiResponse from 'App/Helpers/ApiResponse'
import Group from 'App/Models/Group'
import Member from 'App/Models/Member'
import Teacher from 'App/Models/Teacher'

export default class GroupsController {
  public async show({ response, params }: HttpContextContract) {
    const group = await Group.find(params.id)
    if (!group) return ApiResponse.badRequest(response, 'No data to show.')
    const member = await Member.query().where('group_id', group.id).preload('user')
    const teacher = await Teacher.query().where('group_id', group.id).preload('mentor')
    const data = [
      group,
      {
        member: member,
      },
      {
        mentor: teacher,
      },
    ]
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
}
