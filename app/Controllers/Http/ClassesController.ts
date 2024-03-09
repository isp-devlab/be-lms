//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import ApiResponse from 'App/Helpers/ApiResponse'
import { schema } from '@ioc:Adonis/Core/Validator'
import Student from 'App/Models/Student'

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

  public async join({ request, response, auth }: HttpContextContract) {
    const getUser = await auth.use('api').authenticate()
    const groupJoinSchema = schema.create({
      classId: schema.string(),
    })
    const payload = await request.validate({ schema: groupJoinSchema })
    const classes = await Class.query().where('id', payload.classId).first()
    if (!classes) return ApiResponse.badRequest(response, 'No data')
    const studentCheck = await Student.query()
      .where('class_id', classes.id)
      .where('user_id', getUser.id)
      .first()
    if (studentCheck) return ApiResponse.conflict(response, 'Student already joined')

    const student = new Student()
    student.classId = classes.id
    student.userId = getUser.id
    const data = await student.save()

    return ApiResponse.ok(response, data, 'Student joined successfully')
  }
}
