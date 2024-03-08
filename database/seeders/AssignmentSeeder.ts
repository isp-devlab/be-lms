import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Assignment from 'App/Models/Assignment'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await Assignment.createMany([
      {
        groupId: '6e3486d6-2f4b-4952-bdb5-d7437a4f189b',
        mentorId: 'd04c232c-e1ac-42ad-9b36-82967f9e2ce2',
        startTime: DateTime.now(),
        endTime: DateTime.now(),
      },
    ])
  }
}
