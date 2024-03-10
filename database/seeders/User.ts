import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: 'a02ec0b6-d04f-43dd-baff-27bc29e9dfd0',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123',
        password: 'password',
      },
      // {
      //   id: 'a02ec0b6-d04f-43dd-baff-27bc29e9dfd1',
      //   name: 'Fajar',
      //   email: 'fajar@example.co.id',
      //   phoneNumber: '123',
      //   password: 'password',
      // },
    ])
  }
}
