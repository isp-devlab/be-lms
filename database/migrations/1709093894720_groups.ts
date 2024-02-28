import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'groups'

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
      table.string('name').notNullable()
      table.string('referral_code').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
