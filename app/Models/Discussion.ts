import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Mentor from './Mentor'
import Group from './Group'
import uuid from 'uuid-wand'
import Comment from './Comment'

export default class Discussion extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Discussion) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public groupId: string | undefined

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @column()
  public mentorId: string | undefined

  @belongsTo(() => Mentor)
  public mentor: BelongsTo<typeof Mentor>

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Comment)
  public comment: HasMany<typeof Comment>
}
