import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Status } from 'Contracts/enum'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.enum('status', Object.values(Status))

      table.dateTime('accepted_at', { useTz: true }).nullable()
      table.dateTime('close_at', { useTz: true }).nullable()
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

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
