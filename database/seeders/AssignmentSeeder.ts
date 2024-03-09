import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Assignment from 'App/Models/Assignment'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await Assignment.createMany([
      {
        groupId: '4f518412-364e-4d84-92c4-20c905b11d54',
        mentorId: '666f0071-5c97-499c-8a6d-e34063e98973',
        title: 'Tugas 1',
        content: 'lorem ipsum dolor sit amet, consectetur adip',
        endTime: DateTime.now(),
      },
    ])
  }
}
