import BaseSchema from '@ioc:Adonis/Lucid/Schema'
enum typeMethod {
  cash = 'cash',
  digital = 'digital',
  blockchain = 'blockchain',
}
export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .enum('type_method', Object.values(typeMethod))
        .defaultTo(typeMethod.cash)
        .notNullable()
      table
        .integer('order_id')
        .unsigned()
        .references('orders.id')
        .onDelete('CASCADE')
      table.string('name_method').notNullable()
      table.float('mount').defaultTo(0).notNullable()
      table.string('currency').defaultTo('USD').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
