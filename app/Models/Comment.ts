import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Discussion from './Discussion'
import Class from './Class'
import User from './User'
import uuid from 'uuid-wand'

export default class Comment extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Class) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string | undefined

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public discussionId: string | undefined

  @belongsTo(() => Discussion)
  public discussion: BelongsTo<typeof Discussion>

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
