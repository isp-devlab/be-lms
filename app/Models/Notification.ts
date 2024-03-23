import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import uuid from 'uuid-wand'
import User from './User'
import Group from './Group'

export default class Notification extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Notification) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string | null | undefined

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public groupId: string | undefined | null

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
