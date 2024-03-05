import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Lesson from './Lesson'
import User from './User'
import Group from './Group'
import uuid from 'uuid-wand'

export default class Member extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Member) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public groupId: string | undefined

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @column()
  public userId: string | undefined

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
