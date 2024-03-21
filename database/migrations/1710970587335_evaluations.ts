import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'evaluations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('attachment_id')
        .references('id')
        .inTable('attachments')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table
        .uuid('mentor_id')
        .references('id')
        .inTable('mentors')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table.float('grade').notNullable()
      table.text('note').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
