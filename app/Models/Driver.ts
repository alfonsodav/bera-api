import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Vehicle from './Vehicle'
import Hash from '@ioc:Adonis/Core/Hash'
import PaymentMethod from './PaymentMethod'
import Order from './Order'
import Notification from './Notification'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public lastName: string

  @column()
  public phone: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public remember_me_token: string

  @column()
  public avatarUrl: string | null

  @hasMany(() => PaymentMethod)
  public paymentMethods: HasMany<typeof PaymentMethod>

  @hasMany(() => Order)
  public orders: HasMany<typeof Order>

  @hasMany(() => Notification)
  public notifications: HasMany<typeof Notification>

  @hasMany(() => Vehicle)
  public vehicles: HasMany<typeof Vehicle>

  @column()
  public drivingLicence: string

  @column.dateTime()
  public expiryDateLicence: DateTime

  @column()
  public addressProof: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(driver: Driver) {
    if (driver.$dirty.password) {
      driver.password = await Hash.make(driver.password)
    }
  }
}
