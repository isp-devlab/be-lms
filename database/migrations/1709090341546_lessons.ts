import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('class_id')
        // .unsigned()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table.string('title').notNullable()
      table.string('content').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
