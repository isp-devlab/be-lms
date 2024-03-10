import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Class from './Class'
import uuid from 'uuid-wand'

export default class Student extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Student) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public classId: string | undefined

  @belongsTo(() => Class)
  public class: BelongsTo<typeof Class>

  @column()
  public userId: string | undefined

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
