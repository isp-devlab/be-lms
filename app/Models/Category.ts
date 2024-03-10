import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeCreate, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import uuid from 'uuid-wand'
import Class from './Class'

export default class Category extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Category) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public slug: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Class)
  public class: HasMany<typeof Class>
}
