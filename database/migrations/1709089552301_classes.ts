import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'classes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('category_id')
        // .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table
        .uuid('mentor_id')
        // .unsigned()
        .references('id')
        .inTable('mentors')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .notNullable()
      table.string('slug').index().notNullable().unique()
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('price').notNullable()
      table.string('thumbnail_path').notNullable()
      table.string('grade').notNullable()
      table.boolean('is_active').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
