import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Group from './Group'
import Mentor from './Mentor'
import uuid from 'uuid-wand'

export default class Teacher extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Teacher) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string
  @column()
  public groupId: string | undefined

  @belongsTo(() => Group)
  public grupu: BelongsTo<typeof Group>

  @column()
  public mentorId: string | undefined

  @belongsTo(() => Mentor)
  public mentor: BelongsTo<typeof Mentor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
