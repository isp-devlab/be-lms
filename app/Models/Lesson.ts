import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'
import uuid from 'uuid-wand'

export default class Lesson extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Lesson) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public classId: string | undefined

  @belongsTo(() => Class)
  public mentor: BelongsTo<typeof Class>

  @column()
  public title: string

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
