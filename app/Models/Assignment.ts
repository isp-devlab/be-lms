import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Mentor from './Mentor'
import Group from './Group'
import uuid from 'uuid-wand'

export default class Assignment extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Assignment) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public mentorId: string | undefined

  @belongsTo(() => Mentor)
  public mentor: BelongsTo<typeof Mentor>

  @column()
  public groupId: string | undefined

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @column()
  public startTime: DateTime

  @column()
  public endTime: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
