import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    await Category.createMany([
      {
        id: 'acd6930a-ea37-4be4-b512-318a8c6a4e4b',
        name: 'JavaScript',
        slug: 'js',
      },
    ])
  }
}
