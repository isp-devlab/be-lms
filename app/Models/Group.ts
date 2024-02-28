import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'
import Mentor from './Mentor'
import uuid from 'uuid-wand'

export default class Group extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Class) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public mentorId: string | undefined

  @belongsTo(() => Mentor)
  public mentor: BelongsTo<typeof Mentor>

  @column()
  public name: string

  @column()
  public referralCode: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
