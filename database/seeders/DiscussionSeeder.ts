import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Discussion from 'App/Models/Discussion'

export default class extends BaseSeeder {
  public async run() {
    await Discussion.createMany([
      {
        groupId: '6e3486d6-2f4b-4952-bdb5-d7437a4f189b',
        mentorId: 'd04c232c-e1ac-42ad-9b36-82967f9e2ce2',
        content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
    ])
  }
}
