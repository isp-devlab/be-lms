import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('phone_number').notNullable()
      table.string('email', 255).notNullable().unique().index()
      table.string('password', 180).notNullable().index()
      table.string('remember_me_token').nullable()
      table.string('image').nullable()
      table.boolean('is_active').defaultTo(false)
      table.boolean('is_student').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
