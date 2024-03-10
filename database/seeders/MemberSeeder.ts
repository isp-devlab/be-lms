import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Member from 'App/Models/Member'

export default class extends BaseSeeder {
  public async run() {
    await Member.createMany([
      {
        groupId: '6e3486d6-2f4b-4952-bdb5-d7437a4f189b',
        userId: 'a02ec0b6-d04f-43dd-baff-27bc29e9dfd0',
      },
    ])
  }
}
