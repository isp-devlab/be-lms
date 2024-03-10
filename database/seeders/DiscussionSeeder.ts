import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Discussion from 'App/Models/Discussion'

export default class extends BaseSeeder {
  public async run() {
    await Discussion.createMany([
      {
        groupId: '6e3486d6-2f4b-4952-bdb5-d7437a4f189b',
        mentorId: 'f762beba-769d-4572-a7ad-262eaac01ec9',
        title: 'Lorem Ipsum',
        content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
    ])
  }
}
