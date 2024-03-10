import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'

export default class extends BaseSeeder {
  public async run() {
    await Student.createMany([
      {
        classId: '4f90f022-e94d-4fb1-84b0-45afd934df21',
        userId: 'a02ec0b6-d04f-43dd-baff-27bc29e9dfd0',
      },
    ])
  }
}
