import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import uuid from 'uuid-wand'
import Role from './Role'

export default class Mentor extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Mentor) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: null })
  public roleId: string | undefined

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @column()
  public name: string

  @column({ serializeAs: null })
  public phoneNumber: string

  @column({ serializeAs: null })
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken: string | null

  @column()
  public image: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: Mentor) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
