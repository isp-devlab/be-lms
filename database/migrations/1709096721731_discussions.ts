import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'discussions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('group_id')
        // .unsigned()
        .references('id')
        .inTable('groups')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .nullable()
      table
        .uuid('mentor_id')
        // .unsigned()
        .references('id')
        .inTable('mentors')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .nullable()
      table.string('content').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}