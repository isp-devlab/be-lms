import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import uuid from 'uuid-wand'
import Member from './Member'
import Student from './Student'

export default class User extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: User) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public phoneNumber: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken: string | null

  @column()
  public image: string | null

  @column({ serializeAs: null })
  public isStudent: boolean

  @column()
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Member)
  public member: HasMany<typeof Member>

  @hasMany(() => Student)
  public student: HasMany<typeof Student>
}
