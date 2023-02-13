/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('login', 'AuthController.userLogin')

Route.post('login-driver', 'AuthController.driverLogin')

Route.resource('users', 'UsersController').apiOnly()
Route.resource('drivers', 'DriversController').apiOnly()
Route.resource('Orders', 'OrdersController').apiOnly()
Route.resource('vehicles', 'VehiclesController').apiOnly()
Route.resource('notifications', 'NotificationsController').apiOnly()
Route.resource('payments-methods', 'PaymentsMethodsContreller').apiOnly()
Route.resource('payments', 'PaymentsController').apiOnly()
Route.resource('travels', 'TravelsController').apiOnly()
