import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponse from 'App/Helpers/ApiResponse'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const data = await Category.all()
    return ApiResponse.ok(response, data, 'Category retrieved successfully')
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await Category.query()
      .where('slug', params.slug)
      .preload('class', (query) => {
        query.preload('mentor')
        query.preload('category')
      })

    return ApiResponse.ok(response, data, 'Category show retrieved successfully')
  }
}
