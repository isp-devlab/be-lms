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
import uuid from 'uuid-wand'
import Mentor from './Mentor'
import Category from './Category'
import Lesson from './Lesson'
import Student from './Student'

export default class Class extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Class) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public slug: string

  @column()
  public categoryId: string | undefined

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column()
  public mentorId: string | undefined

  @belongsTo(() => Mentor)
  public mentor: BelongsTo<typeof Mentor>

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public thumbnailPath: string

  @column()
  public grade: string

  @column()
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Lesson)
  public lesson: HasMany<typeof Lesson>

  @hasMany(() => Student)
  public student: HasMany<typeof Student>
}
