import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { VehicleTypes } from 'Contracts/enum'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vehicleId: string

  @column()
  public make: string

  @column()
  public model: string

  @column()
  public year: number

  @column()
  public color: string

  @column()
  public vehicleType: VehicleTypes

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
