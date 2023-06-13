import { adminUserAuthenticate } from '@/controllers/admin/authenticate.controller'
import { adminUserRefreshToken } from '@/controllers/admin/refresh-token.controller'
import { register } from '@/controllers/admin/register.controller'
import { verifyJWT } from '@/controllers/middlewares/verify-jwt'
import { verifyUserProfile } from '@/controllers/middlewares/verify-user-profile'
import { FastifyInstance } from 'fastify'

export async function adminUserAuthenticateRoutes(app: FastifyInstance) {
  app.post('/sessions', adminUserAuthenticate)

  app.patch('/token/refresh', adminUserRefreshToken)

  /* ROTINAS AUTENTICADAS */
  app.post(
    '/register',
    { onRequest: [verifyJWT, verifyUserProfile('A')] },
    register,
  )
}
