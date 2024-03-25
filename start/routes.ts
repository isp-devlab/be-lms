/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
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
  return {
    projects: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    type: process.env.NODE_ENV,
  }
})
Route.get('/activation/:token', 'AuthController.activation')

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'CategoriesController.index')
      Route.get('/:slug', 'CategoriesController.show')
    }).prefix('/category')

    Route.group(() => {
      Route.post('/register', 'AuthController.register')
      Route.post('/login', 'AuthController.login')
      Route.post('/logout', 'AuthController.logout').middleware('auth')
      Route.get('/me', 'AuthController.me').middleware('auth')
      Route.post('/forget', 'AuthController.forget')
      Route.post('/reset', 'AuthController.reset')
    }).prefix('/auth')

    Route.group(() => {
      Route.put('/', 'ProfilesController.update')
      Route.put('/change-password', 'ProfilesController.changePassword')
      Route.get('/group', 'ProfilesController.group')
      Route.get('/class', 'ProfilesController.class')
      Route.get('/notification', 'ProfilesController.notification')
    })
      .middleware('auth')
      .prefix('/profile')

    Route.group(() => {
      Route.post('/join', 'GroupsController.join')
      Route.get('/:id', 'GroupsController.show')
      Route.delete('/:id/leave', 'GroupsController.leave')
      Route.get('/:id/discussion', 'DiscussionsController.index')
      Route.get('/:id/discussion/:id_discussion', 'DiscussionsController.show')
      Route.post('/:id/discussion/:id_discussion', 'DiscussionsController.comment')
      Route.get('/:id/assignment', 'AssignmentsController.index')
      Route.get('/:id/assignment/:id_assignment', 'AssignmentsController.show')
      Route.post('/:id/assignment/:id_assignment', 'AssignmentsController.attachments')
    })
      .middleware('auth')
      .prefix('/group')

    Route.group(() => {
      Route.get('/', 'ClassesController.index')
      Route.get('/:slug', 'ClassesController.show')
      Route.post('/join', 'ClassesController.join').middleware('auth')
    }).prefix('/class')
  }).prefix('/v1')
}).prefix('/api')
