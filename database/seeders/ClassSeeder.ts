import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Class from 'App/Models/Class'

export default class extends BaseSeeder {
  public async run() {
    await Class.createMany([
      {
        id: '4f90f022-e94d-4fb1-84b0-45afd934df21',
        categoryId: 'acd6930a-ea37-4be4-b512-318a8c6a4e4b',
        mentorId: 'd04c232c-e1ac-42ad-9b36-82967f9e2ce2',
        slug: 'start-backend-with-adonis-js',
        name: 'Start backend with AdonisJS',
        description: 'Lorem ipsum dolar sit amet, consectetur adipiscing elit',
        price: 0,
        thumbnailPath: 'https://static-cse.canva.com/blob/1379324/1600w-wK95f3XNRaM.jpg',
        grade: 'pemula',
        isActive: true,
      },
    ])
  }
}
