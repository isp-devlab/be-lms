import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasOne,
  beforeCreate,
  belongsTo,
  column,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Assignment from './Assignment'
import User from './User'
import uuid from 'uuid-wand'
import Evaluation from './Evaluation'

export default class Attachment extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Attachment) {
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
  public attachmentPath: string | null | undefined

  @column()
  public content: string | null | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Evaluation)
  public evaluation: HasOne<typeof Evaluation>
}
