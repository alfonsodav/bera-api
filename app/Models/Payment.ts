import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

enum typeMethod {
  cash = 'cash',
  digital = 'digital',
  blockchain = 'blockchain',
}

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public typeMethod: typeMethod

  @column()
  public nameMethod: string

  @column()
  public mount: number

  @column()
  public currency: string

  @column()
  public orderId: number

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
