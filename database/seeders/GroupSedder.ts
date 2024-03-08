import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Group from 'App/Models/Group'

export default class extends BaseSeeder {
  public async run() {
    await Group.createMany([
      {
        id: '6e3486d6-2f4b-4952-bdb5-d7437a4f189b',
        name: 'Backend dev Batch 1',
        description: 'Lorem Ipsum dolar sit amet',
        referralCode: '12345',
      },
    ])
  }
}
