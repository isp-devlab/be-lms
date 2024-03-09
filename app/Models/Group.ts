import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeCreate, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import uuid from 'uuid-wand'
import Member from './Member'
import Teacher from './Teacher'
import Discussion from './Discussion'
import Assignment from './Assignment'

export default class Group extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Group) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public referralCode: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Member)
  public member: HasMany<typeof Member>

  @hasMany(() => Teacher)
  public teacher: HasMany<typeof Teacher>

  @hasMany(() => Discussion)
  public discussion: HasMany<typeof Discussion>

  @hasMany(() => Assignment)
  public assignment: HasMany<typeof Assignment>
}
