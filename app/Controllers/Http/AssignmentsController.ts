import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ApiResponse from 'App/Helpers/ApiResponse'
import Assignment from 'App/Models/Assignment'
import Attachment from 'App/Models/Attachment'
import Member from 'App/Models/Member'
import { DateTime } from 'luxon'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import UploadHelper from 'App/Helpers/UploadHelper'

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
        query.where('user_id', getUser.id).preload('user')
      })
      .first()

    return ApiResponse.ok(response, data, 'Assignment show retrieved successfully')
  }

  public async attachments({ response, params, auth, request }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()

    const commentSchema = schema.create({
      content: schema.string.nullable(),
      file: schema.file.optional({
        extnames: [
          'jpg',
          'jpeg',
          'gif',
          'png',
          'doc',
          'docx',
          'ppt',
          'pptx',
          'xls',
          'xlsx',
          'pdf',
          'txt',
        ],
      }),
    })
    const payload = await request.validate({ schema: commentSchema })

    const memberCheck = await Member.query()
      .where('group_id', params.id)
      .where('user_id', getUser.id)
      .first()
    if (!memberCheck) return ApiResponse.forbidden(response, 'Access denied')

    const assignmentCheck = await Assignment.query().where('id', params.id_assignment).first()
    if (!assignmentCheck) return ApiResponse.badRequest(response, 'No found data')
    if (assignmentCheck?.endTime < DateTime.now())
      return ApiResponse.badRequest(response, 'Attachment has been closed')

    const attachmentCheck = await Attachment.query()
      .where('assignment_id', params.id_assignment)
      .where('user_id', getUser.id)
      .first()
    if (attachmentCheck) return ApiResponse.conflict(response, 'Attachment already exists')

    const attachment = new Attachment()
    attachment.userId = getUser.id
    attachment.assignmentId = params.id_assignment
    attachment.content = payload.content
    if (payload.file) {
      const filePath = await UploadHelper.upload(payload.file, 'group_' + params.id + '/attachment')
      attachment.attachmentPath = filePath.url
    }
    attachment.submitedTime = DateTime.now()
    const data = await attachment.save()

    return ApiResponse.ok(response, data, 'Atachment created successfully')
  }
}
