import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { VehicleTypes } from 'Contracts/enum'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('vehicle_id', 20)
      table.string('make')
      table.string('model')
      table.integer('year')
      table.string('color')
      table.enum('vehicleType', Object.values(VehicleTypes))
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
