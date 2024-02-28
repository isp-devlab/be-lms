import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Assignment from './Assignment'
import Class from './Class'
import User from './User'
import uuid from 'uuid-wand'

export default class Attachment extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Class) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public assignmentId: string | undefined

  @belongsTo(() => Assignment)
  public assignment: BelongsTo<typeof Assignment>

  @column()
  public userId: string | undefined

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public attachmentPath: string

  @column()
  public submitedTime: DateTime

  @column()
  public point: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
