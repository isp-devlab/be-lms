import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'assignments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('mentor_id')
        // .unsigned()
        .references('id')
        .inTable('mentors')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .nullable()
      table
        .uuid('group_id')
        // .unsigned()
        .references('id')
        .inTable('groups')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .nullable()
      table.timestamp('start_time').notNullable()
      table.timestamp('end_time').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
