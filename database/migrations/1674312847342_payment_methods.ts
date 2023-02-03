import BaseSchema from '@ioc:Adonis/Lucid/Schema'
enum typeMethod {
  cash = 'cash',
  digital = 'digital',
  blockchain = 'blockchain',
}
export default class extends BaseSchema {
  protected tableName = 'payment_methods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('number_account').notNullable()
      table.integer('no_identification').nullable()
      table
        .enum('type_method', Object.values(typeMethod))
        .defaultTo(typeMethod.cash)
        .notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')

      table
        .integer('driver_id')
        .unsigned()
        .references('drivers.id')
        .onDelete('CASCADE')

      table.unique(['user_id', 'driver_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
