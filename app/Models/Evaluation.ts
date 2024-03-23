import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Mentor from './Mentor'
import Attachment from './Attachment'
import uuid from 'uuid-wand'

export default class Evaluation extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Evaluation) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public attachmentId: string

  @belongsTo(() => Attachment)
  public attachment: BelongsTo<typeof Attachment>

  @column()
  public mentorId: string

  @belongsTo(() => Mentor)
  public mentor: BelongsTo<typeof Mentor>

  @column()
  public grade: number

  @column()
  public note: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
