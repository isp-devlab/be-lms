import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'attachments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('assignment_id')
        // .unsigned()
        .references('id')
        .inTable('assignments')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table
        .uuid('user_id')
        // .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table.string('attachment_path').nullable()
      table.text('content').nullable()
      table.timestamp('submited_time').notNullable()
      table.integer('point').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
