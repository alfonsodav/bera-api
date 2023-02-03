import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Payment from './Payment'
import Travel from './Travel'
import { Status } from 'Contracts/enum'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Payment)
  public payments: HasMany<typeof Payment>

  @hasOne(() => Travel)
  public travel: HasOne<typeof Travel>

  @column.dateTime()
  public acceptedAt: DateTime

  @column.dateTime()
  public closeAt: DateTime

  @column()
  public status: Status

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
