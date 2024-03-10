import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Mentor from 'App/Models/Mentor'

export default class extends BaseSeeder {
  public async run() {
    await Mentor.createMany([
      {
        id: 'f762beba-769d-4572-a7ad-262eaac01ec9',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123',
        password: 'password',
      },
    ])
  }
}
