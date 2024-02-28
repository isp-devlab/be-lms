import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponse from 'App/Helpers/ApiResponse'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const data = await Category.all()
    return ApiResponse.ok(response, data, 'Roles retrieved successfully')
  }
}
