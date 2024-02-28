import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('user_id')
        // .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table
        .uuid('discussion_id')
        // .unsigned()
        .references('id')
        .inTable('discussions')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table.text('content').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
